/* eslint-disable prettier/prettier */
import {
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Query,
  Delete, 
  Put} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';    // For swagger API documentations

@ApiTags('Created by kennie-judennes')
@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post('create-merchant')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiOperation({ summary: "Create Merchant's Profile" })
  create(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantService.create(createMerchantDto);
  }

  @Get('fetch-merchants')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiOperation({ summary: "Get List of All Merchants" })
  findAll(
    // @Query('status') status: string,
    // @Query('page') page = 1,
    // @Query('limit') limit = 2
    ) {   
    //  const offset = (page - 1) * limit;
    //  const items = [];
    //  return {
    //   items,
    //   page,
    //   limit,
    // };
    // http://localhost:3000/merchant?status=Active&limit=2&page=1
    //  return `Status is ${status}, Page is ${page}, limit is ${limit}`;
    return  this.merchantService.findAll();
  }

  @Get('get-single-merchant/:id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiOperation({ summary: "Get Single Merchant's Profile" })
  findOne(@Param('id') merchantId: string) {
    return this.merchantService.findOne(merchantId);
  }

  @Patch('patch-merchant/:id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiOperation({ summary: "Patch Merchant's Profile" })
  patchMerchant(@Param('id') id:number, @Body() updateMerchantData:UpdateMerchantDto){
    return this.merchantService.patchMerchant(id, updateMerchantData);
  }

  @Put('update-merchant/:id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiOperation({ summary: "Update Merchant's Profile" })
   update(@Param('id') id:number, @Body() updateMerchantData:UpdateMerchantDto){
    return this.merchantService.update(id, updateMerchantData);
  }

  @Delete('delete-merchant/:id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiOperation({ summary: "Delete Merchant's Profile" })
  remove(@Param('id') id: string) {
    return this.merchantService.remove(id);
  }
}
