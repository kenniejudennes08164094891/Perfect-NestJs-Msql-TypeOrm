/* eslint-disable prettier/prettier */
import { HttpException,HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { AuthService } from './auth/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Login } from './entities/login.entity';
import * as bcrypt from 'bcrypt';



@Injectable()
export class LoginService {
  private logger: Logger;

  constructor(
    private readonly userService: AuthService,
    private readonly jwtService: JwtService,
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>
  ) { 
    this.logger = new Logger(LoginService.name);
  }




 async login(createLoginDto: CreateLoginDto | any, jwt: JwtService) {

  const existingEntity = await this.loginRepository.findOne({ where: { id: createLoginDto?.id } });
  if (existingEntity) {
    //This checks if a merchantID exists in the database, in order to avoid duplicates.
    // throw new HttpException('merchantID Already exists', HttpStatus.BAD_REQUEST);
    const { password } = existingEntity;
    if (bcrypt.compare(createLoginDto?.password, password)) {
      const payload = { email: createLoginDto.email };
      return {
          token: jwt?.sign(payload),
      };
  }
  return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
  }

  const entity = this.loginRepository.create(createLoginDto)
  await this.loginRepository.save(entity);
  const successMessage: any = {
    message: "Merchant's profile has been created successfully",
    createdAt: new Date(),
    details: entity
  }
  return successMessage;
  // const loginPayload = {
  //   email: createLoginDto?.email,
  //   password: createLoginDto?.password
  // }
  // this.logger.log("login payload>>", loginPayload)
  // this.loginRepository.save(createLoginDto)  
  // const accessTokenResponse = {
  //   access_token: this.jwtService.sign(loginPayload),
  //   details: {
  //     message: "user is loggedIn succesfully",
  //     loginDate: new Date(),
  //     Credentials: createLoginDto
  //   }
  // }

  //   return accessTokenResponse;
  }
}
