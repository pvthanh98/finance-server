import { Injectable } from '@nestjs/common';
import { LogInteface } from 'src/types/log.types';
import { EmailService } from '../shared_modules/email.service';
import { LogService } from '../shared_modules/log.service';

@Injectable()
export class CommonService {
    constructor(
        private logService: LogService,
        private emailService: EmailService
    ){

    }

    log(logData: LogInteface){
        return this.logService.log(logData);
    }

    async getLogs () {
        return this.logService.getLogs();
    }
}
