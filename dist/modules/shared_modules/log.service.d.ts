import { Log } from 'src/entities/log.entity';
import { LogInteface } from 'src/types/log.types';
import { Repository } from 'typeorm';
export declare class LogService {
    private logRepo;
    constructor(logRepo: Repository<Log>);
    log(logData: LogInteface): Promise<string>;
    getLogs(): Promise<Log[]>;
}
