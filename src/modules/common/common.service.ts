import { Injectable } from '@nestjs/common';
import { LogInteface } from 'src/types/log.types';
import { LogService } from '../shared_modules/log.service';

@Injectable()
export class CommonService {
    constructor(private logService: LogService){

    }

    log(logData: LogInteface){
        return this.logService.log(logData);
    }

    async getLogs () {
        return this.logService.getLogs();
    }
}
