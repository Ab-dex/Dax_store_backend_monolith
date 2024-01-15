import { Module } from '@nestjs/common';
import { MongoDataServiceModule } from '../../infrastructure/data-services/mongo/mongo-data-service.module';

@Module({
  imports: [MongoDataServiceModule],
  exports: [MongoDataServiceModule],
})
export class DataServicesModule {}
