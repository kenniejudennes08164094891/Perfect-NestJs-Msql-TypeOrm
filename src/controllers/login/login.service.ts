/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Login } from './entities/login.entity';
import * as bcrypt from 'bcrypt';   //for hashing passwords     npm install bcrypt
import * as jwt from 'jsonwebtoken';
import { secret } from './Utils/secret';



@Injectable()
export class LoginService {
  private logger: Logger;
  formattedDate = "";
  private readonly jwtSecret = `${secret}`;

  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>
  ) {
    this.logger = new Logger(LoginService.name);
  }




  async login(createLoginDto: CreateLoginDto, email: string): Promise<Login | undefined> {

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date?.getMonth() + 1)?.padStart(2, '0');
    const day = String(date?.getDate())?.padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const parts = formattedDate?.split("-");
    if (parts?.length === 3) {
      const inputDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      const [day, month, year] = inputDate.split("-");
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = monthNames[parseInt(month) - 1];
      const formattedDate = `${day}-${monthName}-${year} ${hours}:${minutes}:${seconds}`;
      this.formattedDate = formattedDate;
    }

    const existingEntity = await this.loginRepository.findOne({ where: { email  } });
    if (existingEntity) {
      //This checks if a user exists in the database, in order to avoid duplicates.
      //const isPasswordMatch = await bcrypt.compare(createLoginDto.password, storedHashedPassword); to check if password matches...result returns a boolean as true else false
      throw new HttpException('user Already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(createLoginDto?.password, 10);
    const loginPayload = {
      email: createLoginDto.email,
      password: hashedPassword,
      createdAt: this.formattedDate
    }

    const entity = this.loginRepository.create(loginPayload)
    await this.loginRepository.save(entity);

    const expiresIn = 3600; // 1 hour in seconds
    const jwtRegister = jwt.sign(loginPayload, this.jwtSecret, { expiresIn });

    const successMessage: any = {
      message: "User has been registered successfully",
      access_token: jwtRegister,
      details: entity
    }
    return successMessage;
  }
}
