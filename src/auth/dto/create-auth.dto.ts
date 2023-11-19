/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class CreateAuthDto {
    @IsString() @IsEmail() @IsNotEmpty({message: "username is a required field"}) 
    public username: string;

    @IsString()  @IsNotEmpty({message: "password is a required field"}) 
    public password: string;
}
