/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';  
import * as dotenv from 'dotenv';
//npm install --save @nestjs/swagger swagger-ui-express
// npm install dotenv
// npm install @nestjs/config

async function bootstrap() {
  dotenv.config(); 
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  //Swagger documentations here
  const config = new DocumentBuilder()
  .setTitle('Merchant-Controller-Service-Documentations')
  .setDescription('API documentation for merchant use')
  .setVersion('1.0')
  .addTag('Created by Kennie-Judennes')
  .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document);

  //after swagger setup,kill all available port 3000 and type.....nest start --watch
  // browse http://localhost:3000/api-docs#/   or   http://localhost:3000/api-docs

  await app.listen(3000); 
  //process.env.PORT || 3000
}
bootstrap();
