/* eslint-disable prettier/prettier */
import {ArrayMinSize, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, isString, IsString} from 'class-validator';
import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, PrimaryColumn} from 'typeorm';
import {Res} from "@nestjs/common";


@Entity('merchant',{synchronize: true})
export class Merchant extends  BaseEntity{

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
