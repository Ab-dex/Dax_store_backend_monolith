import { Module } from '@nestjs/common';
import { AuthsUseCases } from './auths.use-cases';
import { UsersUsesCasesModule } from '../users/users-uses-cases.module';

@Module({
  imports: [UsersUsesCasesModule],
  providers: [AuthsUseCases],
  exports: [AuthsUseCases],
})
export class AuthsUseCasesModule {}
