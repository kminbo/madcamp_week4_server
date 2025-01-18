import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); //모든 API 경로 앞에 api 붙이기

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
