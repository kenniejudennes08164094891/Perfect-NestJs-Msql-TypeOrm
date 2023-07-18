/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

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
