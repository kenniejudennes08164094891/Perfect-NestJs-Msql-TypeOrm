/* eslint-disable prettier/prettier */
import {EntitySchema} from "typeorm";
import {CreateMerchantDto} from "../dto/create-merchant.dto";


export const merchantEntitySchema = new EntitySchema<CreateMerchantDto>({
    name: 'merchant',
    target: CreateMerchantDto,
    columns: {
        merchantId: {type: "string"},
        merchantEmail: {type:"string"},
        merchantGender: {type: "string"},
        merchantCharge: {type: "string"}
    },
})

//export default merchantEntitySchema