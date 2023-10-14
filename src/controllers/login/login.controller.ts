/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards , Request, Logger, Get, Res} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Login Controller')
@Controller('login')
export class LoginController {

  private logger: Logger;
  constructor(private readonly loginService: LoginService, private readonly jwt: JwtService) {
    this.logger = new Logger(LoginController.name);
  }

  @Post('signin')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'UnAuthorized' })
  @ApiOperation({ summary: "Authenticate Merchant" })
  async create(@Res() @Body() @Request() createLoginDto: CreateLoginDto) {
    // this.logger.log("login payloadXYZ>>", createLoginDto);
    const token = await this.loginService.login(createLoginDto, this.jwt)
    this.logger.log("login token>>", token);
    this.logger.log("login jwt>>", this.jwt);
    return token//this.loginService.login(createLoginDto, token);
  }


  @Get('user-profile')
  getProfile() {
    // Your protected route logic here
  }

}
