import { Module } from '@nestjs/common';
import { UsersUseCases } from '../use-cases/users/users.use-cases';
import { IsUserAlreadyExistConstraint } from '../users/constraints/email-exists.constraints';
import { UsersUsesCasesModule } from '../use-cases/users/users-uses-cases.module';

@Module({
  imports: [UsersUsesCasesModule],
  providers: [IsUserAlreadyExistConstraint, UsersUseCases],
})
export class PresentationsModule {}
