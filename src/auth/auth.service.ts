/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

  private logger: Logger;
  createAuthDto: CreateAuthDto;
  private readonly jwtSecret = 'yourSecretKey'
  constructor(
    @InjectRepository(Auth)
    private readonly loginRepository: Repository<Auth>
  ){
    this.logger = new Logger(AuthService.name);
  }

  async createUser(createAuthDto: CreateAuthDto, username: string): Promise<Auth | undefined>{
    const existingEntity = await this.loginRepository.findOne({ where: { username  } });
    if (existingEntity) {
      throw new HttpException('user Already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(createAuthDto?.password, 10);
    const loginPayload = {
      username: createAuthDto.username,
      password: hashedPassword
    }
    //this.logger.log("payload>>", loginPayload);
    const entity = this.loginRepository.create(loginPayload);
    await this.loginRepository.save(entity);

    const jwtRegister = jwt.sign(loginPayload, this.jwtSecret);
    
    // https://www.jstoolset.com/jwt   to decode JWT
    
    const successMessage: any = {
      message: `${loginPayload.username} has been registered successfully`,
      access_token: jwtRegister,
      details: entity
    }
    return successMessage;
  }


}
