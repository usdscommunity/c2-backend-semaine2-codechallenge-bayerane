import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforme les données entrantes en instances des classes DTO
      whitelist: true, // Supprime les propriétés non définies dans le DTO
      forbidNonWhitelisted: true, // Lève une erreur si des propriétés non définies dans le DTO sont présentes
    }),
  );

  // Configuration CORS
  app.enableCors();

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('API REST de gestion de tâches')
    .setVersion('1.0')
    .addTag('todos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('Application démarrée sur http://localhost:3000');
  console.log('Documentation disponible sur http://localhost:3000/api/docs');
}
void bootstrap();
