import { Inject, Injectable } from '@nestjs/common';
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

@Injectable()
export class UsersService {
    constructor(
     @Inject(TYPES.IUserRepository) private readonly userRepository: UserRepository,
      protected readonly userMapper: UserMapper,
     private readonly configService: ConfigService
  ) {}

  async createUser(props: CreateUserDto): Promise<Result<UserDTO>> {
    
    const user = UserEntity.create({ ...props } as UserDTO).getValue();
    const userDoc = this.userMapper.toModelData(user);
    
    const result = await this.userRepository.create(userDoc as UserDocument);

    const serializedUser = plainToInstance(UserDTO,result.getValue())
    
    return Result.ok(serializedUser)
  }

  async getUsers(): Promise<Result<UserDTO[]>> {
    console.log(this.configService.get("MONGODB_URL"))
    const users = await this.userRepository.findAll()
    console.log(users)
    const serializedUser = users.getValue().map(user => plainToInstance(UserDTO, user))
    return Result.ok(serializedUser)
   
  }
}
