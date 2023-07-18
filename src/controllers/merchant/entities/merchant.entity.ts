/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';


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
