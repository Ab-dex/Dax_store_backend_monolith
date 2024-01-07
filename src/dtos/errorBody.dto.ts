import { ValidationException } from "@app/common/filters/validation.exception"
import { ValidationError } from "class-validator"

export const errorValidationBodyDto = (errors: ValidationError[]) => {
    const result = errors.map(error => ({
    property: error.property,
    message: error.constraints[Object.keys(error.constraints)[0]]
    }))
    return new ValidationException(result)
}