import { Log } from 'src/entities/log.entity';
import { PaginationQueryType } from 'src/types/common.type';
import { LogInteface } from 'src/types/log.types';
import { Repository } from 'typeorm';
export declare class LogService {
    private logRepo;
    constructor(logRepo: Repository<Log>);
    log(logData: LogInteface): Promise<string>;
    getLogs(query: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
}
