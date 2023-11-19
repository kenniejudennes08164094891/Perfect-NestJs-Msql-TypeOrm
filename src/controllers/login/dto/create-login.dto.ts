/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';


export class CreateLoginDto {

    @IsString() @IsEmail() @IsNotEmpty({message: "email is a required field"}) @ApiProperty()
    public email: string;

    @IsString()  @IsNotEmpty({message: "password is a required field"}) @ApiProperty()
    public password: string;
}


