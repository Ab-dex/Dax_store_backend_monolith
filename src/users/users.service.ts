import { Inject, Injectable } from '@nestjs/common';
import { UserMapper } from './mapper/User.mapper';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { Result } from '@app/common/domain/result';
import { UserDTO } from './dtos/user.dto';
import { UserRepository } from './repository/user.repository';
import { Types } from 'src/Constants';
import { plainToInstance } from 'class-transformer';
import { UserDocument, UserModel } from './model/user.model';

@Injectable()
export class UsersService {
    constructor(
     private readonly userRepository: UserRepository,
     private  readonly userMapper: UserMapper
  ) {}

  async createUser(props: CreateUserDto): Promise<Result<UserDTO>> {
    
    const user = UserEntity.create({ ...props } as UserDTO).getValue();
    // const userDoc = this.userMapper.toModelData(user);
    console.log(this.userMapper)
    const newUserModel: UserModel = {
            
            email: user.email,
      password: user.password,
      firstname: user.firstname,
            lastname: user.lastname,
            created_At: Date.now().toString()
    }
    
    const result = await this.userRepository.create(newUserModel as UserDocument);

    const serializedUser = plainToInstance(UserDTO,result.getValue())
    
    return Result.ok(serializedUser)
  }

  async getUsers(): Promise<Result<UserDTO[]>>{

    const users = await this.userRepository.findAll()
    const serializedUser = users.getValue().map(user => plainToInstance(UserDTO, user))
    return Result.ok(serializedUser)
  }
}
