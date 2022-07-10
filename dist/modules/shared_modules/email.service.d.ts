import { ConfigService } from '@nestjs/config';
import { MessageType, MessageTypeDto } from 'src/types/email.type';
export declare class EmailService {
    private configService;
    constructor(configService: ConfigService);
    sendExpenseAddedMail(message: MessageType): Promise<{
        status: boolean;
    }>;
    sendEmail(message: MessageType): Promise<{
        status: boolean;
    }>;
    sendMail(message: MessageTypeDto): Promise<{
        status: boolean;
    }>;
}
