import { Log } from 'src/entities/log.entity';
import { Repository } from 'typeorm';
export declare class LogService {
    private logRepo;
    constructor(logRepo: Repository<Log>);
    log(message?: string): Promise<string>;
    getLogs(): Promise<Log[]>;
}
