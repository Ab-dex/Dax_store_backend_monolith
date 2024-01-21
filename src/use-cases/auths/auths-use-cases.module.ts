import { Module } from '@nestjs/common';
import { AuthsUseCases } from './auths.use-cases';
import { UsersUsesCasesModule } from '../users/users-uses-cases.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

@Module({
  imports: [
    UsersUsesCasesModule,
    JwtModule.register({
      secret: process.env.AT_JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthsUseCases],
  exports: [AuthsUseCases],
})
export class AuthsUseCasesModule {}
