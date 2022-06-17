import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogFrom, LogType } from 'src/constants/common.constant';
import { Log } from 'src/entities/log.entity';
import { LogInteface } from 'src/types/log.types';
import { Repository } from 'typeorm';

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

    async getLogs() {
        const logs = await this.logRepo.find(
            {
                order: {
                    updatedAt: "DESC",
                },
                take: 8
            }
        );
        return logs;
    }

}