/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';

//import { CorsModule } from '@nestjs/common';   //npm install --save @nestjs/platform-express
// import { HelpersModule } from './helpers/helpers/helpers.module';

//npm install --save @nestjs/passport passport passport-local passport-jwt
// npm install --save @nestjs/jwt

@Module({
  imports: [
    TypeOrmModule.forFeature([Login]) 

  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [
    //PassportModule,
    LoginService  //legit
  ]
})
export class LoginModule {}
