/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    private readonly users = [
        {
          id: 1,
          email: 'judeomosehin@gmail.com',
          password: 'J.j@2015', // In a production scenario, you should hash passwords
        },
        {
          id: 2,
          email: 'kehindejude1995@gmail.com',
          password: 'J.j@2015',
        },
      ];

      async findByEmail(email: string){
        return this.users.find((user:any) => user?.email === email);
      }

      async findById(id: number){
        return this.users.find((user: any) => user?.id === id);
    }
}
