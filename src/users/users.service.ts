import { Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserMapper } from './mapper/User.mapper';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
    constructor(
    @Inject(Types.IUserRepository) private readonly userRepository: IUserRepository,
    private readonly userMapper: UserMapper
  ) {}

  async createUser(props: CreateUserDto): Promise<Result<UserResponse>> {
    
    const user = UserEntity.create({ ...props }).getValue();
    const userDoc = this.userMapper.toPersistence(user);
    const result = await this.userRepository.create(userDoc);
    
    return Result.ok(UserParser.createUserResponse(result.getValue()));
  }
}
