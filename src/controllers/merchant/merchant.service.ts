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
  private merchants: Merchant[] | any = [];
  private logger: Logger;
  constructor(
      @InjectRepository(Merchant)
      private readonly merchantRepository: Repository<Merchant>
  ) {
    this.logger = new Logger(MerchantService.name)
  }

//Service for POST Request
  create(createMerchantDto: CreateMerchantDto) {
   this.merchantRepository.save(createMerchantDto);
   const successMessage:any = {
    message: "Merchant's profile has been created succesfully",
    createdAt: new Date(),
    details: createMerchantDto
   }
   return successMessage;
  }


  //Service for GET Request
  async findAll(): Promise<Merchant[]>{
  return await this.merchantRepository.find();
  }

  //Service for GET/{id} Request
  async findOne(merchantId: string ) {
    const merchant = await this.merchantRepository.findOne({where: {id: merchantId}});
    if(!merchant){
      throw new NotFoundException("could not find merchant's profile!")
    }
    const successResponse:any = {
      message: "Merchant's profile has been displayed succesfully",
      details: merchant
    }
    return successResponse;
  }

  //Service for PATCH Request
 async patchMerchant(id: any, updateMerchantDto: UpdateMerchantDto): Promise<CreateMerchantDto>{
  const merchant = await this.merchantRepository.findOne({where: {id}});
  if(!merchant){
    throw new Error("Merchant not found!");
  }
  Object.assign(merchant, updateMerchantDto);
  await this.merchantRepository.save(merchant);
  const successResponse:any = {
    message: "Merchant's profile has been updated succesfully",
    details: merchant
   }
   return successResponse;
  }

  //Service for PUT Request
  async update(id: any, updateMerchantDto: UpdateMerchantDto): Promise<CreateMerchantDto> {
    const merchant = await this.merchantRepository.findOne({where: {id}});
    if(!merchant){
      throw new Error("Merchant not found!");
    }
    Object.assign(merchant, updateMerchantDto);
    // this.logger.log("update merchant DTO>>", updateMerchantDto);
     await this.merchantRepository.save(merchant);
     const successResponse:any = {
      message: "Merchant's profile has been updated succesfully",
      details: merchant
     }
     return successResponse;
  }



  //Service for Delete Request
 async remove(id: string) {
    const merchant = await this.merchantRepository.findOne({where: {id}});
    if(!merchant){
    throw new NotFoundException("could not find merchant's profile!")
    }
    this.merchantRepository.delete(id);
    const successResponse:any = {message: `profile with id ${id} has been deleted succesfully`}
    return successResponse;
  }
}
