/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerchantModule } from './controllers/merchant/merchant.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CreateMerchantDto} from "./controllers/merchant/dto/create-merchant.dto";


@Module({
  imports: [
      MerchantModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'J.j@2015',
      database: 'test',
      entities: [CreateMerchantDto], //entities,
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
 
}
