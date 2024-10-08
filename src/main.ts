import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CsrfFilter } from 'ncsrf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Congress API')
    .setDescription('API for Congress')
    .setVersion('1.0')
    .addTag('congress')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const whitelist = ['http://localhost:4200', 'https://unac.edu.co/congreso'];
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  SwaggerModule.setup('swagger', app, document);
  app.enableCors(corsOptions);
  app.useGlobalFilters(new CsrfFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
