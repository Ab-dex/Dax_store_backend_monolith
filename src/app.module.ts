import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { ConfigsModule } from './config/core_config/configs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigsModule, WinstonModule.forRoot({}), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
