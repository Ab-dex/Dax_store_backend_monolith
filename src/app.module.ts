import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppUseCase } from './use-cases/app.use-case';
import { WinstonModule } from 'nest-winston';
import { UsersModule } from './users/users.module';
import { UserRepository } from './users/repository/user.repository';
import { ConfigsModule } from '@app/common/config/core_config/configs.module';
import { DatabaseModule } from 'libs/common/src/infrastructures';
import { ProductsModule } from './products/products.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/common/presentation/guards/Role.guard';
import { DataServicesModule } from './services/data-services/data-services.module';
import {
  AuthsController,
  ProductsController,
  UsersController,
} from './controllers';
import { UsersUsesCasesModule } from './use-cases/users/users-uses-cases.module';
import { AuthsUseCasesModule } from './use-cases/auths/auths-use-cases.module';
import { ProductsUseCasesModule } from './use-cases/products/products-use-cases.module';
import { IsUserAlreadyExistConstraint } from './domain/constraints';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CategoriesUseCasesModule } from './use-cases/categories/categories-use-cases.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PassportModule } from '@nestjs/passport';
import { StrategiesModule } from "./presentation/strategies/strategies.module";

@Module({
  imports: [
    StrategiesModule,
    ConfigsModule,
    ThrottlerModule.forRoot([
      {
        name: 'short-live',
        ttl: 1000,
        limit: 1,
      },
      {
        name: 'long-live',
        ttl: 60000,
        limit: 80,
      },
    ]),
    WinstonModule.forRoot({}),
    DataServicesModule,
    DatabaseModule,
    ProductsUseCasesModule,
    UsersUsesCasesModule,
    AuthsUseCasesModule,
    CategoriesUseCasesModule,
  ],
  controllers: [
    AppController,
    AuthsController,
    UsersController,
    CategoriesController,
    ProductsController,
  ],
  providers: [
    AppUseCase,
    IsUserAlreadyExistConstraint,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
