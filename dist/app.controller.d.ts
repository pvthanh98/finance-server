import { Request } from 'express';
import { AuthService } from './modules/auth/auth.service';
import { LogService } from './modules/shared_modules/log.service';
export declare class AppController {
    private readonly logService;
    private authService;
    constructor(logService: LogService, authService: AuthService);
    getHello(req: Request): Promise<string>;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
