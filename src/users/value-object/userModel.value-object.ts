import { ValueObjects } from '@app/common/domain/value-objects';
import { UserEntity } from '../entity/user.entity';

export class UserModelValueObject extends ValueObjects<UserEntity> {
  constructor(props: UserEntity) {
    super(props);
  }
}
