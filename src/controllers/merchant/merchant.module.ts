/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Merchant } from './entities/merchant.entity';
import { JwtService } from '@nestjs/jwt';  // for authenticating all API's


@Module({
  imports: [
      TypeOrmModule.forFeature([Merchant])
  ],
  controllers: [MerchantController],
  providers: [ MerchantService, JwtService]
})
export class MerchantModule {}
