import { registerAs } from "@nestjs/config"


enum configKey{
    App_Config = "APP"
}

export enum Environments {
    Development = "development",
    staging = "staging"
}

const appConfig = registerAs(configKey.App_Config, () => (
    {
        env: Environments[process.env.NODE_ENV as keyof typeof Environments],
        port: parseInt(process.env.PORT)
    }
))

export const configurations = [appConfig]