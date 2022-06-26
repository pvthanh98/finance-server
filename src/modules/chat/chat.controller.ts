import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PaginationQueryPipe } from 'src/pipes/pagination-query.pipe';
import { PaginationQueryType, UserPayload } from 'src/types/common.type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService){}

    @Get('conversation')
    getConversation(@Query(PaginationQueryPipe) query: PaginationQueryType, @Req() req: any){
        return this.chatService.getConversation(query, req.user as UserPayload);
    }

}
