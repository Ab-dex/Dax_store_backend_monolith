import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UsersService) {}
  async validate(email: any, args: ValidationArguments) {
    const userResponse = await this.userService.validateUser(email);

    if (userResponse.isSuccess) {
      return false;
    }
    return true;
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
