import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from '../mappers/User.mapper';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.model';
import { ConfigModule } from '@nestjs/config';
import { IsUserAlreadyExistConstraint } from './constraints/email-exists.constraints';
import { CheckGetRequestBodyMiddleware } from '@app/common/utils/middlewares/checkGetRequestBody.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    UserMapper,
    IsUserAlreadyExistConstraint,
  ],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckGetRequestBodyMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
