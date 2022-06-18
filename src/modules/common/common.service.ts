import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/types/common.type';
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

    async getLogs (query?: PaginationQueryType) {
        return this.logService.getLogs(query);
    }
}
