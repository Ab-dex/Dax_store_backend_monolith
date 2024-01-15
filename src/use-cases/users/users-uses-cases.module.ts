import { Module } from '@nestjs/common';
import { UsersUseCases } from './users.use-cases';
import { DataServicesModule } from '../../services';
import { UserMapper } from '../../domain/mappers/User.mapper';

@Module({
  imports: [DataServicesModule],
  providers: [UsersUseCases, UserMapper],
  exports: [UsersUseCases],
})
export class UsersUsesCasesModule {}
