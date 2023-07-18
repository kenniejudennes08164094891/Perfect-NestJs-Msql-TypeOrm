/* eslint-disable prettier/prettier */
import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Logger} from "@nestjs/common";
import {MerchantModel} from "./TypeOrm/merchant.model";
import { InjectModel } from '@nestjs/sequelize';
import {Merchant} from "./entities/merchant.entity";


@Injectable()
export class MerchantService {
  private readonly merchant: CreateMerchantDto | any = [];
  private logger: Logger;
  constructor(
      @InjectRepository(Merchant)
     // @InjectModel(MerchantModel)

      private readonly merchantRepository: Repository<Merchant>
  ) {
    this.logger = new Logger(MerchantService.name)
  }


  create(createMerchantDto: CreateMerchantDto) {
   return this.merchantRepository.save(createMerchantDto);
  }

  async findAll(): Promise<Merchant[]> {
  return await this.merchantRepository.find();
  }

  async findOne(merchantId: string ) {
    const merchant = await this.merchantRepository.findOne({where: {id: merchantId}});
    if(!merchant){
      throw new NotFoundException("could not find merchant's profile!")
    }
    return merchant;
  }

  update(id: any, updateMerchantDto: UpdateMerchantDto) {
  const index = this.merchant.findIndex((elem: any) => {
    elem.id = id;
  })
    updateMerchantDto = this.merchant[id];
    this.logger.log("updated merchant entry>>", updateMerchantDto);
    throw new NotFoundException(`id to update is ${id}`)
   // return merchantToUpdate

  }

  replacePost(id:any, post:UpdateMerchantDto){
    const postIndex = this.merchant.findIndex((post: any) => {
      post.id === id;
    })
    if(postIndex > -1){
      this.merchant[postIndex] = post;
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

 async remove(id: string) {
    const merchant = await this.merchantRepository.findOne({where: {id}});
    if(!merchant){
      throw new NotFoundException("could not find merchant's profile!")
    }
    this.merchantRepository.delete(id);
   return `profile with id ${id} has been deleted succesfully`;
  }
}
