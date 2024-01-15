import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppUseCase } from './use-cases/app.use-case';
import { WinstonModule } from 'nest-winston';
import { UsersModule } from './users/users.module';
import { UserRepository } from './users/repository/user.repository';
import { ConfigsModule } from '@app/common/config/core_config/configs.module';
import { DatabaseModule } from 'libs/common/src/infrastructures';
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
  providers: [AppUseCase],
})
export class AppModule {}
