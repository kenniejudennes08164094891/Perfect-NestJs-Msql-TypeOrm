/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { AuthService } from './auth/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { secret } from './Utils/secret';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';



//npm install --save @nestjs/passport passport passport-local passport-jwt
// npm install --save @nestjs/jwt

@Module({
  imports: [
    TypeOrmModule.forFeature([Login]),
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    // JwtModule.register({
    //   secret: secret, 
    //   secretOrPrivateKey: "qwrqwtqrtwtr",
    //   signOptions: { expiresIn: '1h' },
    // }), 
    // ConfigModule.forRoot({
    //   isGlobal: true, 
    //   envFilePath: '/src/.env', 
    // }),



    ConfigModule.forRoot(), 
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: (configService) => ({
        secret: configService.get('JWT_SECRET'), 
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService], 
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, AuthService, JwtService ],
  exports: [
    PassportModule,
    LoginService  //legit
  ]
})
export class LoginModule {}
