/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class JwtStrategy extends PassportStrategy(null) {
    constructor() {
        super({
          secretOrKey: process.env.TOKEN_SECRET,
        });
      }
}
