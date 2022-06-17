import { Controller, Get } from '@nestjs/common';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
    constructor(private commonService: CommonService){}
    @Get('ping')
    pingServer(){
        return this.commonService.log()
    }

    @Get('log')
    getLog(){
        return this.commonService.getLogs()
    }

}
