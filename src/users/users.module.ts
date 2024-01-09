import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Types } from 'src/Constants';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from './mapper/User.mapper';
import { TYPES } from './constants/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './model/user.model';

@Module({
  imports: [MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
    ]),],
  controllers: [UsersController],
  providers: [UsersService,{
    provide: TYPES.IUserRepository,
    useClass: UserRepository
  }, 
    UserMapper,
  ]
})
export class UsersModule {}
