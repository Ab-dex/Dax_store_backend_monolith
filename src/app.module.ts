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
import { DataServicesModule } from './services/data-services/data-services.module';
import {
  AuthsController,
  ProductsController,
  UsersController,
} from './controllers';
import { ProductsUseCases } from './use-cases/products/products.use-cases';
import { UsersUsesCasesModule } from './use-cases/users/users-uses-cases.module';
import { AuthsUseCasesModule } from './use-cases/auths/auths-use-cases.module';
import { ProductsUseCasesModule } from "./use-cases/products/products-use-cases.module";

@Module({
  // imports: [
  //   ConfigsModule,
  //   WinstonModule.forRoot({}),
  //   AuthsModule,
  //   UsersModule,
  //   DatabaseModule,
  //   ProductsModule,
  // ],
  imports: [
    ConfigsModule,
    WinstonModule.forRoot({}),
    DataServicesModule,
    DatabaseModule,
    ProductsUseCasesModule,
    UsersUsesCasesModule,
    AuthsUseCasesModule,
  ],
  controllers: [
    AppController,
    ProductsController,
    UsersController,
    AuthsController,
  ],
  providers: [AppUseCase],
})
export class AppModule {}
