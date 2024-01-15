import { Model } from 'mongoose';
import { UserDocument, UserModels } from '../model/user.model';
import { IMapper } from '@app/common/domain/mapper';
import { GenericDocumentRepository } from '@app/common/domain/abstracts/generic-document.repository';
import { UserEntity } from '../../domain/entities/users/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserMapper } from '../../domain/mappers/User.mapper';

@Injectable()
export class UserRepository extends GenericDocumentRepository<
  UserEntity,
  UserDocument
> {
  constructor(
    @InjectModel('Users') protected readonly model: Model<UserDocument>,
    protected readonly mapper: UserMapper,
  ) {
    super(model, mapper);
  }
}
