import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Types } from 'src/Constants';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, {provide: Types.UserRepository, useClass: UserRepository}]
})
export class UsersModule {}
