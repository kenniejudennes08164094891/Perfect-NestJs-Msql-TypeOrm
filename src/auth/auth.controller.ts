/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { Auth } from './entities/auth.entity';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  logger: Logger
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  @Post('signup')
 async create(@Body() createAuthDto: CreateAuthDto): Promise<Auth |any> {
  const token = await this.authService.createUser(createAuthDto, createAuthDto.username);
    return token
  }

}
