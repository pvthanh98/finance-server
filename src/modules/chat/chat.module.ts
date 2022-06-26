import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation';
import { Message } from 'src/entities/message';
import { ConversationUser } from 'src/entities/conversation-user';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message, ConversationUser])],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService]
})
export class ChatModule { }
