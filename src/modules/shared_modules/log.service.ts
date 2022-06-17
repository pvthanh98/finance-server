import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { LogType, LOG_CONTENT } from 'src/constants/common.constant';
import { Log } from 'src/entities/log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
    constructor(
        @InjectRepository(Log)
        private logRepo: Repository<Log>,
    ) { }

    async log(message:string = LOG_CONTENT.PING) {
        const logCount = await this.logRepo.count({where:{type:LogType.PING}});
        const logContent = await this.logRepo.create({
            message: `${message}${logCount+1}`,
            type: LogType.PING
        })
        
        await this.logRepo.save(logContent);
        return logContent.message;
    }

    async getLogs(){
        const logs = await this.logRepo.find(
            {
                order: {
                    updatedAt: "DESC",
                },
            }
        );
        return logs;
    }

}