import { Module } from '@nestjs/common';
import { AuthsUseCases } from './auths.use-cases';
import { UsersUsesCasesModule } from '../users/users-uses-cases.module';
import { StrategiesModule } from '../../presentation/strategies/strategies.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigsModule } from '@app/common/config/core_config/configs.module';

@Module({
  imports: [
    UsersUsesCasesModule,
    PassportModule.register({ defaultStrategy: 'local' }),
    JwtModule.registerAsync({
      useFactory: (configureService: ConfigService) => ({
        secret: configureService.get('AT_JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      imports: [ConfigsModule],
      inject: [ConfigService],
    }),
  ],
  providers: [AuthsUseCases],
  exports: [AuthsUseCases],
})
export class AuthsUseCasesModule {}
