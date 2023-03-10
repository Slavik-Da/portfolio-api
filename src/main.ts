import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { validateEnv } from './validateEnv';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/libs/http-exception.filter';
async function bootstrap() {
  validateEnv();
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = app.get(ConfigService).get<number>('PORT') ?? 3000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);
}
bootstrap();
