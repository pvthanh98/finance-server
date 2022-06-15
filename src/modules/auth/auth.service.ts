import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    if(username=="thanhphan" && pass == "1"){
        return {
            userId:1,
            username: "thanhphan"
        }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}