import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchantDto } from './create-merchant.dto';
import {ArrayMinSize, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, isString, IsString} from 'class-validator';
import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, PrimaryColumn} from 'typeorm';



export class UpdateMerchantDto extends PartialType(CreateMerchantDto) {

   @PrimaryGeneratedColumn({type: 'bigint', name: 'user_id'})
   public id: string;

   @Column({name: 'merchantId', nullable: false, default: ''}) @IsString() @IsNotEmpty()
   public merchantId: string;

   @Column({name:'merchantEmail', nullable: false, default: ''}) @IsString() @IsEmail() @IsNotEmpty({message: "merchantEmail is a required field"})
   public merchantEmail: string;

   @Column({name:'merchantGender', nullable: false, default: ''}) @IsString() @IsNotEmpty()
   public merchantGender: string;

   @Column({name: 'merchantCharge', nullable: false, default: ''}) @IsString() @IsNotEmpty()
   public merchantCharge: string;
}
