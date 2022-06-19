import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
const bcryptjs = require("bcryptjs");

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user: User = await this.userService.findByEmail(email);
    if (user) {      
      if (bcryptjs.compareSync(`${pass}`, `${user.password}`)) {        
        return {
          email: user.email,
          sub: user.id,
          isAdmin: user.isAdmin
        }
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.sub, isAdmin: user.isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}