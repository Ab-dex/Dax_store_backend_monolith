import { HttpStatus, Inject, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserMapper } from '../mappers/User.mapper';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { Result } from '@app/common/domain/result';
import { UserDTO } from './dtos/user.dto';
import { UserRepository } from './repository/user.repository';
import { plainToInstance } from 'class-transformer';
import { UserDocument } from './model/user.model';
import { GetUsersQueryDTO } from './dtos/getUserQuery.dto';
import { TYPE } from 'src/Constants';

@Injectable()
export class UsersService {
    constructor(
     @Inject(TYPE.IUserRepository) private readonly userRepository: UserRepository,
      protected readonly userMapper: UserMapper,
  ) {}

  /**
   * 
   * @param props takes in dto
   * @returns returns response dto
   */
  async createUser(props: CreateUserDto): Promise<Result<UserDTO>> {
    
    // create an enitity from createUserDto
    const user = UserEntity.create({ ...props } as UserDTO).getValue();

    // map the created entity to model
    const userDoc = this.userMapper.toModelData(user);
    
    // use the model to make request to repository
    const result = await this.userRepository.create(userDoc as UserDocument);

    // filter off the password with class transformer and make it into UserDTO, the form in which clients should get data
    const serializedUser = plainToInstance(UserDTO, result.getValue(), {excludeExtraneousValues: true})
    return Result.ok(serializedUser)
  }



  /**
   * 
   * @param query 
   * @returns filtered users or all users
   */

  async getUsers(query?: GetUsersQueryDTO | null): Promise<Result<any>> {

    const { limit, currentPage, firstname, lastname, email } = query;
    let pageCount: Number
    

    const currPage = Number(currentPage) || 1;
    const responsePerPage = Number(limit) || undefined;
    const skip = responsePerPage * (currPage - 1)

    const filterObj = {
      ...(lastname && { lastname: lastname.trim().charAt(0).toUpperCase() + lastname.trim().slice(1) }),
      ...(firstname && { firstname: firstname.trim().charAt(0).toUpperCase() + firstname.trim().slice(1) }),
      ...(email && { email: email }),
    }
    

    const itemCount = (await this.userRepository.getCount(filterObj)).getValue()

     if (limit) {
      pageCount = Math.ceil(itemCount as number / limit)
    }
    
    // offset it by the pagecount if requested page from client is greater than pagecount
    const offset = (Number(currPage) > Number(pageCount)) ? responsePerPage * (Number(pageCount) - 1) : skip


    const users = await this.userRepository.findAll(filterObj, null, { limit: responsePerPage, ...(limit && {skip: offset}) })
    
   

    const serializedUser = users.getValue().map(user => {

      const {email, id: userId, firstname, lastname} = user
      return plainToInstance(UserDTO, {
      id: userId.toHexString(),
      email,
      firstname,
      lastname
    }, {excludeExtraneousValues: true})
    })
    return Result.ok({users: [...serializedUser], pageCount, itemCount, ...({page: currPage, isNext: Number(currPage) < Number(pageCount), isPrevious: Number(currPage) > 1})})
   
  }

  async getOneUserById(id: string): Promise<Result<UserDTO>> {
    try {
      const user = await this.userRepository.findById(id)
    const {id: userId, email, firstname, lastname} = user.getValue()
    
    // can't directly spread user.getvalue() because an instance of entity was created and returned from the findById method with public getters and setters that can be used to access properties
    const serializedUser = plainToInstance(UserDTO, {
      id: userId.toHexString(),
      email,
      firstname,
      lastname
    }, { excludeExtraneousValues: true })
      
    return Result.ok(serializedUser)
    } catch (err) {
      if (err instanceof NotAcceptableException || NotFoundException) {
        return Result.fail("No such user exists", HttpStatus.NOT_FOUND)
      }
      else {
        throw new InternalServerErrorException("Something went wrong")
      }
    }
   
  }

    async verifyUser(email: string, password: string) {
    try {
      const user = await this.userRepository.findByValues({ email });

      // const isPasswordMatch = await bcrypt.compare(password, user.password);
      // if (!isPasswordMatch) {
      //   throw new UnauthorizedException('Invalid credentials');
      // }
      return user;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException('Invalid credentials');
      }
      throw new InternalServerErrorException(err);
    }
  }
}
