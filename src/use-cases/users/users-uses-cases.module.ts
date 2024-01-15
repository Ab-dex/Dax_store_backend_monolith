import { Module } from '@nestjs/common';
import { UsersUseCases } from './users.use-cases';

@Module({
  providers: [UsersUseCases],
  exports: [UsersUseCases],
})
export class UsersUsesCasesModule {}
