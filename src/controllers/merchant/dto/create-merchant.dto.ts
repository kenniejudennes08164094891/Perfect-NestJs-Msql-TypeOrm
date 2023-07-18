/* eslint-disable prettier/prettier */
import {ArrayMinSize, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, isString, IsString} from 'class-validator';
import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, PrimaryColumn} from 'typeorm';
import {Res} from "@nestjs/common";


export class CreateMerchantDto{

     @IsString() @IsNotEmpty()
    public merchantId: string;

     @IsString() @IsEmail() @IsNotEmpty({message: "merchantEmail is a required field"})
    public merchantEmail: string;

   @IsString() @IsNotEmpty()
    public merchantGender: string;

     @IsString() @IsNotEmpty()
    public merchantCharge: string;

}
