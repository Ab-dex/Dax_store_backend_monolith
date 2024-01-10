import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from '../mappers/User.mapper';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.model';
import { ConfigModule } from '@nestjs/config';
import { IsUserAlreadyExistConstraint } from './constraints/email-exists.constraints';
import { CheckGetRequestBodyMiddleware } from '@app/common/middlewares/checkGetRequestBody.middleware';
import { TYPE } from 'src/Constants';

@Module({
  imports: [MongooseModule.forFeature([
      { name: "Users", schema: UserSchema },
    ]),ConfigModule],
  controllers: [UsersController],
  providers: [UsersService,{
    provide: TYPE.IUserRepository,
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
