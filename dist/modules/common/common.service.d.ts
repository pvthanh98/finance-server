import { PaginationQueryType } from 'src/types/common.type';
import { LogInteface } from 'src/types/log.types';
import { ChatService } from '../chat/chat.service';
import { LogService } from '../shared_modules/log.service';
import { UserService } from '../user/user.service';
export declare class CommonService {
    private logService;
    private userService;
    private chatService;
    constructor(logService: LogService, userService: UserService, chatService: ChatService);
    log(logData: LogInteface): Promise<string>;
    getLogs(query?: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
    execute(): Promise<import("../../entities/friend.entity").Friend[]>;
    getPublicMessages(query: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
}
