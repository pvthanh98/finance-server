import { Body, Controller, Get, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { LogFrom, LogType } from 'src/constants/common.constant';
import { PaginationQueryPipe } from 'src/pipes/pagination-query.pipe';
import { PaginationQueryType } from 'src/types/common.type';
import { LogInteface } from 'src/types/log.types';
import { CommonService } from './common.service';
import { diskStorage } from 'multer';
import path, { join } from 'path';
import { PublicMessageDto } from '../chat/dto/message.dto';

@Controller('common')
export class CommonController {
  constructor(private commonService: CommonService) { }
  @Get('ping')
  pingServer(@Req() req: Request) {
    const logData: LogInteface = {
      message: req.query.message ? `${req.query.message}` : "Ping",
      from: req.query.from ? `${req.query.from}` : LogFrom.GUEST,
      type: req.query.type ? `${req.query.type}` : LogType.PING
    }
    return this.commonService.log(logData)
  }

  @Get('log')
  getLog(@Query(PaginationQueryPipe) query: PaginationQueryType) {
    return this.commonService.getLogs(query)
  }

  @Get('chat/public-message')
    sendPublicMessage (@Query(PaginationQueryPipe) query: PaginationQueryType){
        return this.commonService.getPublicMessages(query);
    }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: join(__dirname,"../../../", "public/upload/")
  //   })
  // }))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   return {
  //     path: `/static/upload/${file.filename}`
  //   }
  // }

  @Get('execute')
  execute() {
    return this.commonService.execute()
  }



}
