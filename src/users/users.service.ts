import { HttpStatus, Inject, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserMapper } from './mapper/User.mapper';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { Result } from '@app/common/domain/result';
import { UserDTO } from './dtos/user.dto';
import { UserRepository } from './repository/user.repository';
import { plainToInstance } from 'class-transformer';
import { UserDocument, UserModels } from './model/user.model';
import { TYPES } from './constants/constants';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
     @Inject(TYPES.IUserRepository) private readonly userRepository: UserRepository,
      protected readonly userMapper: UserMapper,
     private readonly configService: ConfigService
  ) {}

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

  async getUsers(): Promise<Result<UserDTO[]>> {
    const users = await this.userRepository.findAll()
    const serializedUser = users.getValue().map(user => plainToInstance(UserDTO, user, {excludeExtraneousValues: true}))
    
    return Result.ok(serializedUser)
   
  }

  async getOneUserById(id: string): Promise<Result<UserDTO>> {
    try {
      const user = await this.userRepository.findById(id)
    const {id: userId, email, firstname, lastname} = user.getValue()
    
    // cant directly spread user.getvalue() because an instance of entity was created and returned from the findById method with public getters and setters that can be used to access properties
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
