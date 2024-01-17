import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class INonNegativeNumber implements ValidatorConstraintInterface {
  async validate(value: number, args: ValidationArguments) {
    return value >= 0;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be a non negative number.`;
  }
}

export function IsNonNegativeNumber(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: INonNegativeNumber,
    });
  };
}

// export function NonNegativeNumber(
//   property: string,
//   validationOptions?: ValidationOptions,
// ) {
//   return (object: any, propertyName: string) => {
//     registerDecorator({
//       name: 'IsNonNegativeNumber',
//       target: object.constructor,
//       propertyName,
//       constraints: [property],
//       options: validationOptions,
//       validator: {
//         validate(value: any, args: ValidationArguments) {
//           // const [relatedPropertyName] = args.constraints;
//           // const relatedValue = (args.object as any)[relatedPropertyName];
//           // return value === relatedValue;
//
//           return value >= 0;
//         },
//
//         defaultMessage(args: ValidationArguments) {
//           const [relatedPropertyName] = args.constraints;
//           return `${propertyName} must match ${relatedPropertyName} exactly`;
//         },
//       },
//     });
//   };
// }
