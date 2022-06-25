import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PublicMessageDto } from './dto/message.dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService){}
    // @Post('public')
    // sendPublicMessage (@Body() dto: PublicMessageDto){
    //     return this.chatService.sendPublicMessage(dto);
    // }

}
