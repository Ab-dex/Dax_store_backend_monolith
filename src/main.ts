import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { errorValidationBodyDto } from '../libs/common/src/dtos/errorBody.dto';
import { configureSwagger } from '@app/common/config/swagger_config';
import { HttpExceptionFilter } from '@app/common/utils/filters/httpExceptions.filter';
import { ValidationExceptionFilter } from '@app/common/utils/filters/validationExceptions.filter';
import { LoggerFactory } from '@app/common/config/logger_config/logger.config';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory(),
    bodyParser: true,
  });

  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });

  configureSwagger(app);

  // this allows global use of validation from class-validator.
  // whitelist removes extradata not needed in the request body before controllers perform actions on them
  /* stopAtFirstError stops the execution of the validation and throws error immediately for the first error encountered. If All the error associated with the validation is desired to go at once, skip this field else set it to true*/
  app.useGlobalPipes(
    new ValidationPipe({
      // The exceptionFactory is invoked ones a set of values does not comform to it's dto in the app. These dto's are annotated with class-validators annotations.
      exceptionFactory: errorValidationBodyDto,
      whitelist: true,
      transform: true,
    }),
  );

  // Custom global exception handlers to restructure how my exceptions will be delivered to users. The more general exception handlers should come before the fine-grained ones
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );

  // This is required in order to inject dependencies such as userService into class-validator constraints
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT);

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);

    console.log('Shutting server down due to unhandled promise rejections...');
    app.close();
  });
}
bootstrap();
