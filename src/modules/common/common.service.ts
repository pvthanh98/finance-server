import { Injectable } from '@nestjs/common';
import { LogService } from '../shared_modules/log.service';

@Injectable()
export class CommonService {
    constructor(private logService: LogService){

    }

    log(message?: string){
        return this.logService.log(message);
    }

    async getLogs () {
        return this.logService.getLogs();
    }
}
