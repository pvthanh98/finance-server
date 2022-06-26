import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Friend } from 'src/entities/friend.entity';
import { Conversation } from 'src/entities/conversation';
import { ConversationUser } from 'src/entities/conversation-user';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Friend, Conversation, ConversationUser]),
    ConfigModule
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
