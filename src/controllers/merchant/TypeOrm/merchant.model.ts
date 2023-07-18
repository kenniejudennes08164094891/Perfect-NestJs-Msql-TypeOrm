/* eslint-disable prettier/prettier */
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class MerchantModel extends Model{

    @Column
    merchantId: string;

    @Column
    merchantEmail: string;

    @Column
    merchantGender: string;

    @Column
    merchantCharge: string;

    @Column({ defaultValue: true })
    isActive: boolean;
}