import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   await app.listen(4444);

   const appUrl = await app.getUrl();

   console.log('Server started in', appUrl);
}
bootstrap();
