import { LogService } from '../shared_modules/log.service';
export declare class CommonService {
    private logService;
    constructor(logService: LogService);
    log(message?: string): Promise<string>;
    getLogs(): Promise<import("../../entities/log.entity").Log[]>;
}
