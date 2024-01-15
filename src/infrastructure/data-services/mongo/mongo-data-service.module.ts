import { Module } from "@nestjs/common";
import { IDataServices } from "../../../domain/abstracts";

@Module({
  providers: [{
    provide: IDataServices,
    useValue: ""
  }],
  exports: []
})

export class MongoDataServiceModule{}