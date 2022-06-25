import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation';
import { Message } from 'src/entities/message';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, Message]),
  ],
  providers: [ConversationService],
  controllers: [ConversationController]
})
export class ConversationModule { }
