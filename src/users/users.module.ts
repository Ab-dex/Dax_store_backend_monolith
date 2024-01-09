import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Types } from 'src/Constants';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from './mapper/User.mapper';
import { TYPES } from './constants/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModels, UserSchema } from './model/user.model';
import { ConfigModule } from '@nestjs/config';
import { IsUserAlreadyExistConstraint } from './constraints/email-exists.constraints';
import { CheckGetRequestBodyMiddleware } from '@app/common/middlewares/checkGetRequestBody.middleware';

@Module({
  imports: [MongooseModule.forFeature([
      { name: "Users", schema: UserSchema },
    ]),ConfigModule],
  controllers: [UsersController],
  providers: [UsersService,{
    provide: TYPES.IUserRepository,
    useClass: UserRepository
  }, 
    UserMapper,
    IsUserAlreadyExistConstraint,
  ]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckGetRequestBodyMiddleware).forRoutes('*');
  }
}
