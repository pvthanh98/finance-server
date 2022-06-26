import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Conversation } from './conversation';
import { User } from './user.entity';

@Entity()
export class ConversationUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  userId: string;

  @ManyToOne(() => User, user => user.conversationUsers)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: String })
  conversationId: string;

  // @Column({name:'conversationId', type: String})
  @ManyToOne(() => Conversation, conversation => conversation.conversationUsers)
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}