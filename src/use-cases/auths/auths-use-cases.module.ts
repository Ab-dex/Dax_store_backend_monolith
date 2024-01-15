import { Module } from '@nestjs/common';
import { AuthsUseCases } from './auths.use-cases';

@Module({
  providers: [AuthsUseCases],
  exports: [AuthsUseCases],
})
export class AuthsUseCasesModule {}
