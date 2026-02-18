import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Development CORS - allow all origins
  app.enableCors({
    origin: '*',
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    credentials: true,
  });

  await app.listen(5000, '0.0.0.0'); // expose backend to Codespaces port forwarding
}

bootstrap();

// Optional: export for Vercel Serverless
export default async (req: any, res: any) => {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // you can keep this for serverless
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
};
