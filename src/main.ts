import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { errorValidationBodyDto } from '../libs/common/src/dtos/errorBody.dto';
import { configureSwagger } from '@app/common/config/swagger_config';
import { HttpExceptionFilter } from '@app/common/filters/httpExceptions.filter';
import { ValidationExceptionFilter } from '@app/common/filters/validationExceptions.filter';
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

  // this is to apply validation globally. whitelist removes extradata not needed in the request body before controllers perform actions on them
  /* stopAtFirstError stops the execution of the validation and throws error immediately for the first error encountered. If All the error associated with the validation is desired to go at once, skip this field else set it to true*/

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: errorValidationBodyDto,
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT);

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);

    console.log('Shutting server down due to unhandled promise rejections...');
    app.close();
  });
}
bootstrap();
