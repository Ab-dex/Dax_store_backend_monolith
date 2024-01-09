import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { TYPES } from '../constants/constants';
import { UserRepository } from '../repository/user.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(
        @Inject(TYPES.IUserRepository) private readonly userRepository: UserRepository,
    ){}
    async validate(email: any, args: ValidationArguments) {
      const userResponse = await this.userRepository.findByValues({email});
    
        if (userResponse.isSuccess) {
        return false
    }
      return true;
  }
}


export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}