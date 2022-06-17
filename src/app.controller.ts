import { Controller, Get, Post, Req, UseGuards, Request as RequestNest } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AppService } from './app.service';
import { LogFrom, LogType } from './constants/common.constant';
import { AuthService } from './modules/auth/auth.service';
import { LogService } from './modules/shared_modules/log.service';
import { LogInteface } from './types/log.types';

@Controller()
export class AppController {
  constructor(
    private readonly logService: LogService,
    private authService: AuthService
  ) {}

  @Get()
  getHello(@Req() req: Request){
    const logData: LogInteface = {
      message : req.query.message ? `${req.query.message}` : "Hello World",
      from: req.query.from ? `${req.query.from}` : LogFrom.GUEST,
      type: req.query.type ? `${req.query.type}` : LogType.PING
    }
      return this.logService.log(logData)
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@RequestNest() req) {
    return this.authService.login(req.user)
  }
}
