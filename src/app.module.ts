/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerchantModule } from './controllers/merchant/merchant.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CreateMerchantDto} from "./controllers/merchant/dto/create-merchant.dto";
import { LoginModule } from './controllers/login/login.module';
import { CreateLoginDto } from './controllers/login/dto/create-login.dto';




@Module({
  imports: [
      MerchantModule,
      LoginModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'J.j@2015',
      database: 'test',
      entities: [CreateMerchantDto, CreateLoginDto], //entities,
      synchronize: true,
      autoLoadEntities: true,
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
