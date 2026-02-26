import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAccessGuard } from './shared/guard/JwtAccessGuard.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshGuard } from './shared/guard/JwtRefreshGuard.guard';
import cookieParser from 'cookie-parser';
async function bootstrap() {   
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: false
  })) 
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true
  });
  app.useGlobalGuards(new JwtRefreshGuard(app.get(JwtService), app.get(ConfigService), app.get(Reflector)));
  app.useGlobalGuards(new JwtAccessGuard(app.get(JwtService), app.get(ConfigService), app.get(Reflector)));

  await app.listen(process.env.PORT ?? 8000);
  console.log(`server run on port ${process.env.PORT}`);

}
bootstrap();
