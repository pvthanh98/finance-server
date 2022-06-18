import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogFrom, LogType } from 'src/constants/common.constant';
import { Log } from 'src/entities/log.entity';
import { FormatPaginationType, PaginationQueryType } from 'src/types/common.type';
import { LogInteface } from 'src/types/log.types';
import { Repository } from 'typeorm';
import { FormatPaginationQuery, formatPaginationResponse } from '../utils/format-pagination';

@Injectable()
export class LogService {
    constructor(
        @InjectRepository(Log)
        private logRepo: Repository<Log>,
    ) { }

    async log(logData: LogInteface) {
        const { message = "", from = LogFrom.GUEST, type = LogType.UNKNOW } = logData;
        const logContent = await this.logRepo.create({
            message,
            type,
            from
        })

        await this.logRepo.save(logContent);
        return logContent.message;
    }

    async getLogs(query: PaginationQueryType) {
        const queryFormat = FormatPaginationQuery(query) as FormatPaginationType;
        console.log(queryFormat)
        const results = await this.logRepo.findAndCount(
            {
                order: {
                    updatedAt: "DESC",
                },
                take: queryFormat.limit,
                skip: queryFormat.offset
            }
        );
        return formatPaginationResponse(results, queryFormat)
    }

}