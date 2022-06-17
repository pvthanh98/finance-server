import { LogInteface } from 'src/types/log.types';
import { EmailService } from '../shared_modules/email.service';
import { LogService } from '../shared_modules/log.service';
export declare class CommonService {
    private logService;
    private emailService;
    constructor(logService: LogService, emailService: EmailService);
    log(logData: LogInteface): Promise<string>;
    getLogs(): Promise<import("../../entities/log.entity").Log[]>;
}
