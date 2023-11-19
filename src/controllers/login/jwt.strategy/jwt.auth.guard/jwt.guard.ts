/* eslint-disable prettier/prettier */
import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { secret } from '../../Utils/secret';

@Injectable()
export class JwtGuard implements CanActivate {
    logger: Logger;
    constructor(private readonly jwtService: JwtService) {
        this.logger = new Logger(JwtGuard.name);
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')[1]; // Using "Bearer <token>" format
      if (!token) {
        throw new UnauthorizedException('Token not provided');
       // return false;
      }else{
        try {
          const decoded = this.jwtService.verify(token, { secret: `${secret}` });
          // Optionally, you can attach the decoded user data to the request for further usage
          request.user = decoded;
          return true;
        } catch (error) {
            this.logger.log("error", error)
          throw new UnauthorizedException('Invalid token');
        }
      }
     
    }
}
