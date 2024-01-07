import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const  configureSwagger = (app: INestApplication) => {
    const documentConfig = new DocumentBuilder()
        .setTitle("E-commerce api")
        .setVersion("1.0.0")
        .setDescription("An online store for products you need")
        .addBearerAuth()
        .build()
  const documentFactory = SwaggerModule.createDocument(app, documentConfig)
  return SwaggerModule.setup("api-docs", app, documentFactory )
}