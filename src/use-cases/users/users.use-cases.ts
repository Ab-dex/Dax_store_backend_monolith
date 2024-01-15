import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserMapper } from '../../domain/mappers/User.mapper';
import { UserEntity } from '../../domain/entities/users/user.entity';
import { CreateUserDto } from '../../domain/dtos/users/createUser.dto';
import { Result } from '@app/common/domain/result';
import { UserDTO } from '../../domain/dtos/users/user.dto';
import { UserRepository } from '../../users/repository/user.repository';
import { plainToInstance } from 'class-transformer';
import { UserDocument } from '../../infrastructure/data-services/mongo/model/user-model/user.model';
import { GetUsersQueryDTO } from '../../domain/dtos/users/getUserQuery.dto';
import { TYPE } from '../../Constants';
import { IDataServices } from '../../domain/abstracts';

@Injectable()
export class UsersUseCases {
  constructor(
    private dataServices: IDataServices,
    protected readonly userMapper: UserMapper,
  ) {}

  /**
   *
   * @param props takes in dto
   * @returns returns response dto
   */
  async createUser(props: CreateUserDto): Promise<Result<UserDTO>> {
    // Email exist has already been handled at the validation constraint level for createDTO. Please do not remove that constraint there without implementing such validation check here.

    // password match has also been handled at the validation constraint level much like email.

    // hash the password before creating an entity

    // create an enitity from createUserDto
    const user = UserEntity.create({ ...props } as Omit<
      UserDTO,
      'id'
    >).getValue();

    // map the created entity to product-user-model
    const userDoc = this.userMapper.toModelData(user);

    // use the product-user-model to make request to repository
    const result = await this.dataServices.users.create(
      userDoc as UserDocument,
    );

    // filter off the password with class transformer and make it into UserDTO, the form in which clients should get data
    const serializedUser = plainToInstance(UserDTO, result.getValue(), {
      excludeExtraneousValues: true,
    });
    return Result.ok(serializedUser);
  }

  /**
   *
   * @param query
   * @returns filtered users or all users
   */

  async getUsers(query?: GetUsersQueryDTO | null): Promise<Result<any>> {
    const { limit, currentPage, firstname, lastname, email } = query;
    let pageCount: number;

    const currPage = Number(currentPage) || 1;
    const responsePerPage = Number(limit) || undefined;
    const skip = responsePerPage * (currPage - 1);

    const filterObj = {
      ...(lastname && {
        lastname:
          lastname.trim().charAt(0).toUpperCase() + lastname.trim().slice(1),
      }),
      ...(firstname && {
        firstname:
          firstname.trim().charAt(0).toUpperCase() + firstname.trim().slice(1),
      }),
      ...(email && { email: email }),
    };

    const itemCount = (
      await this.dataServices.users.getCount(filterObj)
    ).getValue();

    if (limit) {
      pageCount = Math.ceil((itemCount as number) / limit);
    }

    // offset it by the pagecount if requested page from client is greater than pagecount
    const offset =
      Number(currPage) > Number(pageCount)
        ? responsePerPage * (Number(pageCount) - 1)
        : skip;

    const users = await this.dataServices.users.findAll(filterObj, null, {
      limit: responsePerPage,
      ...(limit && { skip: offset }),
    });

    const serializedUser = users.getValue().map((user) => {
      const { email, id: userId, firstname, lastname } = user;
      return plainToInstance(
        UserDTO,
        {
          id: userId.toHexString(),
          email,
          firstname,
          lastname,
        },
        { excludeExtraneousValues: true },
      );
    });
    return Result.ok({
      users: [...serializedUser],
      pageCount,
      itemCount,
      ...{
        page: currPage,
        isNext: Number(currPage) < Number(pageCount),
        isPrevious: Number(currPage) > 1,
      },
    });
  }

  async getOneUserById(id: string): Promise<Result<UserDTO>> {
    try {
      const user = await this.dataServices.users.findById(id);
      const { id: userId, email, firstname, lastname } = user.getValue();

      // can't directly spread user.getvalue() because an instance of entity was created and returned from the findById method with public getters and setters that can be used to access properties
      const serializedUser = plainToInstance(
        UserDTO,
        {
          id: userId.toHexString(),
          email,
          firstname,
          lastname,
        },
        { excludeExtraneousValues: true },
      );

      return Result.ok(serializedUser);
    } catch (err) {
      if (err instanceof NotAcceptableException || NotFoundException) {
        return Result.fail('No such user exists', HttpStatus.NOT_FOUND);
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async validateUser(email: string) {
    try {
      const user = await this.dataServices.users.findByValues({ email });

      // const isPasswordMatch = await bcrypt.compare(password, user.password);
      // if (!isPasswordMatch) {
      //   throw new UnauthorizedException('Invalid credentials');
      // }
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException('Invalid credentials');
      }
      throw new InternalServerErrorException(err);
    }
  }
}
