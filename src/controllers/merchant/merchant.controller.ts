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
  Put,
  ValidationPipe} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto, PaginateDTO } from './dto/create-merchant.dto';
import { UpdateMerchantDto, UpdateToggleStatus } from './dto/update-merchant.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';    // For swagger API documentations
import {Logger} from "@nestjs/common";

@ApiTags('Created by kennie-judennes')
@Controller('merchant')
export class MerchantController {

  private logger: Logger;
  constructor(private readonly merchantService: MerchantService) {
    this.logger = new Logger(MerchantController.name)
  }
 

  @Post('create-merchant')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'UnAuthorized' })
  @ApiOperation({ summary: "Create Merchant's Profile" })
  create(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantService.create(createMerchantDto);
  }

  @Get('fetch-merchants')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'UnAuthorized' })
  @ApiOperation({ summary: "Get List of All Merchants" })
  //Pagination Query for swagger
  @ApiQuery({ name: 'pageNo', type: Number, required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Merchants per page' })
  async findAll(@Query(new ValidationPipe()) paginateDTO: PaginateDTO) { 
    return  this.merchantService.findAll(paginateDTO);
    // http://localhost:3000/merchant/fetch-merchants?page=1&pageSize=10
  }

  @Get('get-single-merchant/:id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'UnAuthorized' })
  @ApiOperation({ summary: "Get Single Merchant's Profile" })
  findOne(@Param('id') merchantId: string) {
    return this.merchantService.findOne(merchantId);
    
  }

  @Patch('patch-merchant/:id')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'UnAuthorized' })
  @ApiOperation({ summary: "Patch Merchant's Profile" })
  patchMerchant(@Param('id') id:number, @Body() updateMerchantData:UpdateMerchantDto){
    return this.merchantService.patchMerchant(id, updateMerchantData);
  }

  @Patch('toggle-merchant-status/:id')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'UnAuthorized' })
  @ApiOperation({ summary: "Toggle Merchant's Status", description: "Status Enums:  active || pending || rejected"})   //StatusValidationPipe
  async toggleStatus(@Param('id') id:number, @Body() updateMerchantData:UpdateToggleStatus){
    return this.merchantService.toggleMerchantStatus(id, updateMerchantData);
  }

  @Put('update-merchant/:id')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'UnAuthorized' })
  @ApiOperation({ summary: "Update Merchant's Profile" })
   update(@Param('id') id:number, @Body() updateMerchantData:UpdateMerchantDto){
    return this.merchantService.update(id, updateMerchantData);
  }

  @Delete('delete-merchant/:id')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'UnAuthorized' })
  @ApiOperation({ summary: "Delete Merchant's Profile" })
  remove(@Param('id') id: string) {
    return this.merchantService.remove(id);
  }
}
