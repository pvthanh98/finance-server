import { LogService } from './modules/shared_modules/log.service';
import { EmailService } from './modules/shared_modules/email.service';
import { GoogleSheetService } from './modules/shared_modules/google_sheet.service';
export declare class TasksService {
    private logService;
    private emailService;
    private ggSheetService;
    constructor(logService: LogService, emailService: EmailService, ggSheetService: GoogleSheetService);
    private readonly logger;
    handleCron(): Promise<void>;
}
