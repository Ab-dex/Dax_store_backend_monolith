import { Module } from '@nestjs/common';
import { ConfigsModule } from '@app/common/config/core_config/configs.module';
import { RtJwtStrategy } from './rtJwt.strategy';
import { AtJwtStrategy } from './atJwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigsModule, JwtModule.register({})],
  providers: [RtJwtStrategy, AtJwtStrategy],
  exports: [RtJwtStrategy, AtJwtStrategy],
})
export class StrategiesModule {}
