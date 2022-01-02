import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UserInputError } from 'apollo-server-express';
import { transformError } from 'common/util/classValudator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (e) => {
        return new UserInputError('Invalid argument value', {
          fields: {
            ...transformError(e),
          },
        });
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
