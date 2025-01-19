import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(bootstrap.name);  

  logger.log(`Server is running on port ${process.env.PORT ?? 3000}`);

  app.setGlobalPrefix('api'); //모든 API 경로 앞에 api 붙이기
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
