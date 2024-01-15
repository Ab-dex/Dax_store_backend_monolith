import { Model } from 'mongoose';
import { UserDocument, UserModels } from '../../infrastructure/data-services/mongo/model/user-model/user.model';
import { GenericDocumentRepository } from '@app/common/domain/abstracts/generic-document.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserMapper } from '../../domain/mappers/User.mapper';
import { IUserEntity } from '../../domain';

@Injectable()
export class UserRepository extends GenericDocumentRepository<
  IUserEntity,
  UserDocument
> {
  constructor(
    @InjectModel('Users') protected readonly model: Model<UserDocument>,
    protected readonly mapper: UserMapper,
  ) {
    super(model, mapper);
  }
}
