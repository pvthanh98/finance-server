import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { LogFrom, LogType } from 'src/constants/common.constant';
import { PaginationQueryPipe } from 'src/pipes/pagination-query.pipe';
import { PaginationQueryType } from 'src/types/common.type';
import { LogInteface } from 'src/types/log.types';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
    constructor(private commonService: CommonService){}
    @Get('ping')
    pingServer(@Req() req: Request){
      const logData: LogInteface = {
        message : req.query.message ? `${req.query.message}` : "Ping",
        from: req.query.from ? `${req.query.from}` : LogFrom.GUEST,
        type: req.query.type ? `${req.query.type}` : LogType.PING
      }
        return this.commonService.log(logData)
    }

    @Get('log')
    getLog(@Query(PaginationQueryPipe) query: PaginationQueryType){
        return this.commonService.getLogs(query)
    }

}
