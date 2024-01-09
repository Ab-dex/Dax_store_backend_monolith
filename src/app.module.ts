import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { UsersModule } from './users/users.module';
import { UserRepository } from './users/repository/user.repository';
import { ConfigsModule } from '@app/common/config/core_config/configs.module';
import { DatabaseModule } from '@app/common/database';

@Module({
  imports: [ConfigsModule, WinstonModule.forRoot({}), UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
