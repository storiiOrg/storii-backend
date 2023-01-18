import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('port', process.env.PORT || 8080);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
