import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersUseCases } from '../use-cases/users/users.use-cases';
import { UsersController } from '../controllers/users/users.controller';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from '../domain/mappers/User.mapper';
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
    UsersUseCases,
    UserRepository,
    UserMapper,
    IsUserAlreadyExistConstraint,
  ],
  exports: [UsersUseCases],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckGetRequestBodyMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
