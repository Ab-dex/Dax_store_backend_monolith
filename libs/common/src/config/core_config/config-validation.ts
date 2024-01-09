import { plainToClass, plainToInstance } from "class-transformer"
import { IsDefined, IsEnum, IsNumber, validateSync } from "class-validator"
import { Environments } from "./configs"


class EnvironmentVariables{

    @IsDefined()
    @IsEnum(Environments)
    NODE_ENV: Environments

    @IsDefined()
    @IsNumber()
    PORT: Number

    @IsDefined()
    MONGODB_URI: string

    @IsDefined()
    MONGODB_USERNAME: string

    @IsDefined()
    MONGODB_PASSWORD: any
}

export const validateConfig = (configuration: Record<string, unknown>) => {

    const finalConfig = plainToClass(EnvironmentVariables, configuration, {
        enableImplicitConversion: true
    })

    const testError = validateSync(finalConfig, {
        skipMissingProperties: false
    })

    
    if (testError?.length) {
        console.log("Environment variable Errors:")
        for (let error of testError) {
            console.log(`${error.property}: ${error.value}`)
            console.log(error?.constraints)
        }

        throw new Error("All environment variables must be provided")
    }
    return finalConfig

}