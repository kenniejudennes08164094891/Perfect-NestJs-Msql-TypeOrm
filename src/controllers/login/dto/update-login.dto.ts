/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateLoginDto } from './create-login.dto';
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class UpdateLoginDto extends PartialType(CreateLoginDto) {

    @IsString() @IsEmail() @IsNotEmpty({message: "email is a required field"}) 
    public email: string;

    @IsString()  @IsNotEmpty({message: "password is a required field"}) 
    public password: string;
}
