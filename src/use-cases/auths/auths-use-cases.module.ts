import { Module } from '@nestjs/common';
import { AuthsUseCases } from './auths.use-cases';
import { UsersUsesCasesModule } from '../users/users-uses-cases.module';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [UsersUsesCasesModule, JwtModule.register(({}))],
  providers: [AuthsUseCases],
  exports: [AuthsUseCases],
})
export class AuthsUseCasesModule {}
