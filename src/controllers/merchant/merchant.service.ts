/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchantDto, ToggleStatus } from './dto/create-merchant.dto';
import { UpdateMerchantDto, UpdateToggleStatus } from './dto/update-merchant.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { Merchant } from "./entities/merchant.entity";
import { PaginateDTO } from './dto/create-merchant.dto';




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
  async create(createMerchantDto: CreateMerchantDto) {
    const existingEntity = await this.merchantRepository.findOne({ where: { merchantId: createMerchantDto?.merchantId } });
    if (existingEntity) {
      //This checks if a merchantID exists in the database, in order to avoid duplicates.
      throw new HttpException('merchantID Already exists', HttpStatus.BAD_REQUEST);
    }

    const entity = this.merchantRepository.create(createMerchantDto)
    await this.merchantRepository.save(entity);
    const successMessage: any = {
      message: "Merchant's profile has been created successfully",
      createdAt: new Date(),
      details: entity
    }
    return successMessage;
  }


  //Service for GET Request with Pagination
  async findAll(paginateDTO: PaginateDTO): Promise<Merchant[]> {
    const { pageNo, limit }: any = paginateDTO;
    const skip = (pageNo - 1) * limit;

    if(pageNo < 1 || limit < 0){
   //To validate against a wrong pagination input
   throw new HttpException('invalid pagination value', HttpStatus.BAD_REQUEST);
    }

    const [merchant, totals] = await this.merchantRepository.findAndCount({
      skip,
      take: limit
    })

    const paginationResponse: any = {
      merchant,
      paginationParams: {
        totals: totals,
        pageNo: parseInt(pageNo),
        limit: parseInt(limit)
      }
    };
    return paginationResponse;
  }


  //Service for GET/{id} Request
  async findOne(merchantId: string) {
    const merchant = await this.merchantRepository.findOne({ where: { id: merchantId } });
    if (!merchant) {
      throw new NotFoundException("could not find merchant's profile!")
    }
    const successResponse: any = {
      message: "Merchant's profile has been displayed successfully",
      details: merchant
    }
    return successResponse;
  }

  //Service for PATCH Request
  async patchMerchant(id: any, updateMerchantDto: UpdateMerchantDto): Promise<CreateMerchantDto> {
    const merchant = await this.merchantRepository.findOne({ where: { id } });
    if (!merchant) {
      throw new Error("Merchant not found!");
    }
    Object.assign(merchant, updateMerchantDto);
    await this.merchantRepository.save(merchant);
    const successResponse: any = {
      message: "Merchant's profile has been updated successfully",
      details: merchant
    }
    return successResponse;
  }

 //Service for PATCH Request...Toggle status
  async toggleMerchantStatus(id: any, updateMerchantDto: UpdateToggleStatus): Promise<ToggleStatus> {
    const status = ['active', 'pending', 'disabled']
    const filterValidStatus = status.filter((elem: any) => elem === updateMerchantDto?.status);
    if (filterValidStatus[0] === undefined) {
      //To validate against a wrong status input
      throw new HttpException('invalid status type', HttpStatus.BAD_REQUEST);
    }

    const merchant = await this.merchantRepository.findOne({ where: { id } });
    if (!merchant) {
      throw new Error("Merchant not found!");
    }

    Object.assign(merchant, updateMerchantDto);
    await this.merchantRepository.save(merchant);
    const successResponse: any = {
      message: "Merchant's status has been updated successfully",
      details: merchant
    }
    return successResponse;
  }

  //Service for PUT Request
  async update(id: any, updateMerchantDto: UpdateMerchantDto): Promise<CreateMerchantDto> {
    const merchant = await this.merchantRepository.findOne({ where: { id } });
    if (!merchant) {
      throw new Error("Merchant not found!");
    }
    Object.assign(merchant, updateMerchantDto);
    await this.merchantRepository.save(merchant);
    const successResponse: any = {
      message: "Merchant's profile has been updated successfully",
      details: merchant
    }
    return successResponse;
  }



  //Service for Delete Request
  async remove(id: string) {
    const merchant = await this.merchantRepository.findOne({ where: { id } });
    if (!merchant) {
      throw new NotFoundException("could not find merchant's profile!")
    }
    this.merchantRepository.delete(id);
    const successResponse: any = { message: `profile with id '${id}' has been deleted successfully` }
    return successResponse;
  }
}
