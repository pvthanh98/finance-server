import { ConfigService } from '@nestjs/config';
import { MessageType } from 'src/types/email.type';
export declare class EmailService {
    private configService;
    constructor(configService: ConfigService);
    sendExpenseAddedMail(message: MessageType): Promise<{
        status: boolean;
    }>;
    sendEmail(message: MessageType): Promise<{
        status: boolean;
    }>;
}
