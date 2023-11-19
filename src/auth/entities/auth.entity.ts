/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';    
import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'; 

@Entity('user-login',{synchronize: true})
export class Auth extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'bigint', name: 'login_ID'})
    public id: string;

    @Column({name:'username', nullable: false, default: ''}) @IsString() @IsEmail() @IsNotEmpty({message: "username is a required field"})
    public username: string;

    @Column({name:'password', nullable: false, default: ''}) @IsString()  @IsNotEmpty({message: "password is a required field"})
    public password: string;

    
}
