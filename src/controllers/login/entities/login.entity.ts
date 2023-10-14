/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';    //npm i @nestjs/class-validator
import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'; //npm i @nestjs/typeorm  //npm install --save @nestjs/typeorm typeorm mysql2   depending on the database to be used


@Entity('merchant-login',{synchronize: true})
export class Login extends BaseEntity {

    @PrimaryGeneratedColumn({type: 'bigint', name: 'login_ID'})
    public id: string;

    @Column({name:'email', nullable: false, default: ''}) @IsString() @IsEmail() @IsNotEmpty({message: "email is a required field"})
    public email: string;

    @Column({name:'password', nullable: false, default: ''}) @IsString()  @IsNotEmpty({message: "password is a required field"})
    public password: string;

    
    @Column({name: 'createdAt', nullable: false, default: ''}) @IsString() @IsNotEmpty()
    public createdAt: string;

    @Column({name: 'updatedAt', nullable: false, default: ''}) @IsString() @IsNotEmpty()
    public updatedAt: string;

}
