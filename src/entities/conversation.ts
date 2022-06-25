import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ConversationUser } from './conversation-user';
import { Message } from './message';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: String
  })
  name: string;

  @Column({
    type: Boolean,
    default: false
  })
  isGroup: boolean;

  @OneToMany(()=> ConversationUser, conversationUsers => conversationUsers.conversation)
  conversationUsers: ConversationUser[];

  @OneToMany(()=> Message, message => message.conversation)
  messages: Message[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}