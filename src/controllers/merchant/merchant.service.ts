/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Logger} from "@nestjs/common";
import {Merchant} from "./entities/merchant.entity";



@Injectable()
export class MerchantService {
  private readonly merchant: CreateMerchantDto | any = [];
  private logger: Logger;
  constructor(
      @InjectRepository(Merchant)
      private readonly merchantRepository: Repository<Merchant>
  ) {
    this.logger = new Logger(MerchantService.name)
  }

//Service for POST Request
  create(createMerchantDto: CreateMerchantDto) {
   return this.merchantRepository.save(createMerchantDto);
  }


  //Service for GET Request
  async findAll(): Promise<Merchant[]> {
  return await this.merchantRepository.find();
  }

  //Service for GET/{id} Request
  async findOne(merchantId: string ) {
    const merchant = await this.merchantRepository.findOne({where: {id: merchantId}});
    if(!merchant){
      throw new NotFoundException("could not find merchant's profile!")
    }
    return merchant;
  }

  //Service for PUT Request
  async update(id: any, updateMerchantDto: UpdateMerchantDto): Promise<CreateMerchantDto> {
    const merchant = await this.merchantRepository.findOne({where: {id}});
    if(!merchant){
      throw new Error("Merchant not found!");
    }
    Object.assign(merchant, updateMerchantDto);
    return await this.merchantRepository.save(merchant);
  }


  //Service for Delete Request
 async remove(id: string) {
    const merchant = await this.merchantRepository.findOne({where: {id}});
    if(!merchant){
      throw new NotFoundException("could not find merchant's profile!")
    }
    this.merchantRepository.delete(id);
   return `profile with id ${id} has been deleted succesfully`;
  }
}
