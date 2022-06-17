import { Injectable, Logger } from '@nestjs/common';
import { LogService } from './modules/shared_modules/log.service';

@Injectable()
export class TasksService {
    constructor(private logService: LogService) { }
    private readonly logger = new Logger(TasksService.name);
}