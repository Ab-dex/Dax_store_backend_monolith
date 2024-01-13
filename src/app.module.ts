import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { UsersModule } from './users/users.module';
import { UserRepository } from './users/repository/user.repository';
import { ConfigsModule } from '@app/common/config/core_config/configs.module';
import { DatabaseModule } from '@app/common/database';
import { ProductsModule } from './products/products.module';
import { AuthsModule } from './auths/auths.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/common/utils/guards/Role.guard';

@Module({
  imports: [
    ConfigsModule,
    WinstonModule.forRoot({}),
    AuthsModule,
    UsersModule,
    DatabaseModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
