import { BadRequestException } from "@nestjs/common"
import { ValidationError } from "class-validator"
import { ValidationException } from "src/filters/validation.exception"

export const errorValidationBodyDto = (errors: ValidationError[]) => {
    const result = errors.map(error => ({
    property: error.property,
    message: error.constraints[Object.keys(error.constraints)[0]]
    }))
    return new ValidationException(result)
}