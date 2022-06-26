import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation';
import { Message } from 'src/entities/message';
import { UserModule } from 'src/modules/user/user.module';
import { ConversationUser } from 'src/entities/conversation-user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, Message, ConversationUser]),
    UserModule
  ],
  providers: [ConversationService],
  controllers: [ConversationController],
  exports: [ConversationService]
})
export class ConversationModule { }
