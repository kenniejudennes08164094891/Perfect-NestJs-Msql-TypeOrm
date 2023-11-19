/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { CreateAuthDto } from './auth/dto/create-auth.dto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'J.j@2015',
      database: 'auth',
      entities: [CreateAuthDto], //entities,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



// Commands
// npm install --save @nestjs/typeorm typeorm mysql2
//  npm install bcrypt
// npm i @nestjs/class-validator
// npm i passport-local
// npm i @nestjs/passport


// npm install --save @nestjs/jwt passport-jwt
// npm install --save-dev @types/passport-jwt