import { LogInteface } from 'src/types/log.types';
import { LogService } from '../shared_modules/log.service';
export declare class CommonService {
    private logService;
    constructor(logService: LogService);
    log(logData: LogInteface): Promise<string>;
    getLogs(): Promise<import("../../entities/log.entity").Log[]>;
}
