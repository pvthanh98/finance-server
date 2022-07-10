import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Friend } from 'src/entities/friend.entity';
import { Conversation } from 'src/entities/conversation';
import { ConversationUser } from 'src/entities/conversation-user';
import { S3Service } from '../shared_modules/s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Friend, Conversation, ConversationUser]),
    ConfigModule
  ],
  providers: [UserService, S3Service],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
