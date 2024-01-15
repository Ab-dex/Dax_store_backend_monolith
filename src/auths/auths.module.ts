import { Module } from '@nestjs/common';
import { AuthsUseCases } from '../use-cases/auths/auths.use-cases';
import { AuthsController } from '../controllers/auths/auths.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthsController],
  providers: [
    AuthsUseCases,
  ],
})
export class AuthsModule {}
