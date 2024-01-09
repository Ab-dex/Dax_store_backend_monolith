import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Types } from 'src/Constants';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from './mapper/User.mapper';

@Module({
  controllers: [UsersController],
  providers: [UsersService,{
    provide: UserRepository,
    useValue: UserRepository
  }, {
    provide: UserMapper,
    useValue: UserMapper
  }]
})
export class UsersModule {}
