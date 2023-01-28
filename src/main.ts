import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { validateEnv } from './validateEnv';
async function bootstrap() {
  validateEnv();
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = app.get(ConfigService).get<number>('PORT') ?? 3000;
  await app.listen(PORT);
}
bootstrap();
