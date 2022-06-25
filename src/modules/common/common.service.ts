import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/types/common.type';
import { LogInteface } from 'src/types/log.types';
import { ChatService } from '../chat/chat.service';
import { PublicMessageDto } from '../chat/dto/message.dto';
import { EmailService } from '../shared_modules/email.service';
import { LogService } from '../shared_modules/log.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CommonService {
    constructor(
        private logService: LogService,
        private userService: UserService,
        private chatService: ChatService
    ){

    }

    log(logData: LogInteface){
        return this.logService.log(logData);
    }

    async getLogs (query?: PaginationQueryType) {
        return this.logService.getLogs(query);
    }

    async execute (){
        return this.userService.execute()
    }

    async getPublicMessages(query: PaginationQueryType){
        return this.chatService.getPublicMessage(query)
    }
}
