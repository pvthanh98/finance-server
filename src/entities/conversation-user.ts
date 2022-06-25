import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Conversation } from './conversation';
import { User } from './user.entity';

@Entity()
export class ConversationUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(()=> User, user=> user.conversationUsers)
  user: User;

  @ManyToOne(()=> Conversation, conversation=> conversation.conversationUsers)
  conversation: Conversation;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}