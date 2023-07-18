/* eslint-disable prettier/prettier */
import {
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Put} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post()
  create(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantService.create(createMerchantDto);
  }

  @Get()
  findAll() {
    return this.merchantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') merchantId: string) {
    return this.merchantService.findOne(merchantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMerchantDto: UpdateMerchantDto) {
    return this.merchantService.update(+id, updateMerchantDto);
  }

  // @Put(':id')
  // async replacePost(@Param('id') id:any, @Body() post:UpdateMerchantDto){
  //   return this.merchantService.replacePost(Number(id), post);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantService.remove(id);
  }
}
