/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';   // for swagger documentation of the payload
import { IsOptional, IsInt, Min, Max } from 'class-validator';  // For Pagination

export class CreateMerchantDto{

     @IsString() @IsNotEmpty() @ApiProperty() @IsNotEmpty({message: "merchantID is a required field"})
    public merchantId: string;

     @IsString() @IsEmail() @IsNotEmpty({message: "merchantEmail is a required field"}) @ApiProperty()
    public merchantEmail: string;

   @IsString() @IsNotEmpty() @ApiProperty()
    public merchantGender: string;

     @IsString() @IsNotEmpty() @ApiProperty()
    public merchantCharge: string;

    @IsString() @IsNotEmpty()
    public status: string = "pending";
}

export class ToggleStatus{
    
    @IsString() @IsNotEmpty() @ApiProperty()
    public status: string;
}

export class PaginateDTO{
    
    //Pagination params
    @IsOptional() // @IsInt() @Min(1) @Max(100)
    pageNo: number = 1;
  
    @IsOptional() // @IsInt() @Min(1) @Max(100)
    limit: number = 10;

}
