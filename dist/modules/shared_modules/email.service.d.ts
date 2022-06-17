import { ConfigService } from '@nestjs/config';
import { MessageType } from 'src/types/email.type';
export declare class EmailService {
    private configService;
    constructor(configService: ConfigService);
    sendMail(message: MessageType): Promise<{
        status: boolean;
    }>;
}
