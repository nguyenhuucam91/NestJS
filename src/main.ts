import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ContextInterceptor } from './interceptors/context.interceptor';
import { I18nValidationException, I18nValidationExceptionFilter } from 'nestjs-i18n';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory: (err => { return new I18nValidationException(err)})
  }))
  app.useGlobalInterceptors(new ContextInterceptor())
  app.useGlobalFilters(new I18nValidationExceptionFilter())
  await app.listen(3001);
}
bootstrap();
