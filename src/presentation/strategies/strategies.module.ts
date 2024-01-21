import { Module } from '@nestjs/common';
import { ConfigsModule } from '@app/common/config/core_config/configs.module';
import { RtJwtStrategy } from './rtJwt.strategy';
import { AtJwtStrategy } from './atJwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthsUseCasesModule } from "../../use-cases/auths/auths-use-cases.module";

@Module({
  imports: [
    ConfigsModule,
    AuthsUseCasesModule,
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
  providers: [LocalStrategy],
  exports: [LocalStrategy],
})
export class StrategiesModule {}
