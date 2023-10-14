/* eslint-disable prettier/prettier */
//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateMerchantDto, ToggleStatus } from './create-merchant.dto';
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';


export class UpdateMerchantDto extends PartialType(CreateMerchantDto) {

   @IsString() @IsNotEmpty() @IsNotEmpty({message: "merchantID is a required field"})
    public merchantId: string;

     @IsString() @IsEmail() @IsNotEmpty({message: "merchantEmail is a required field"})
    public merchantEmail: string;

   @IsString() @IsNotEmpty()
    public merchantGender: string;

     @IsString() @IsNotEmpty()
    public merchantCharge: string;

    @IsString() @IsNotEmpty()
    public status: string;
}

export class UpdateToggleStatus extends PartialType(ToggleStatus) {
 
     @IsString() @IsNotEmpty()
     public status: string;
 }
