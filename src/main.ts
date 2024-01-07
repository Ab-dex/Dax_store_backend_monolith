import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerFactory } from './config/logger_config/logger.config';
import { errorValidationBodyDto } from './dtos/errorBody.dto';
import { HttpExceptionFilter } from './filters/httpExceptions.filter';
import { ValidationExceptionFilter } from './filters/validationExceptions.filter';
import { configureSwagger } from './config/swagger_config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory(),
    bodyParser: true
  });

  app.enableCors()
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
    prefix: "api/v"
  })

  configureSwagger(app)

  // this is to apply validation globally. whitelist removes extradata not needed in the request body before controllers perform actions on them
  /* stopAtFirstError stops the execution of the validation and throws error immediately for the first error encountered. If All the error associated with the validation is desired to go at once, skip this field else set it to true*/


  app.useGlobalPipes(new ValidationPipe({ exceptionFactory: errorValidationBodyDto, whitelist: true, transform: true }))
  
  app.useGlobalFilters(new HttpExceptionFilter(), new ValidationExceptionFilter())
  await app.listen(process.env.PORT);

  process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  
    console.log('Shutting server down due to unhandled promise rejections...');
    app.close()
});
}
bootstrap();
