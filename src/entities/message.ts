import { MessageTypeEnum } from 'src/constants/message-enum';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Conversation } from './conversation';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: String
  })
  body: string;

  @Column({
    type: String,
    default: MessageTypeEnum.TEXT
  })
  type: string; // text, image, video

  @ManyToOne(() => User, user => user.messages)
  fromUser: User;

  @Column({type:String})
  conversationId: string;

  @ManyToOne(() => Conversation, conversation => conversation.messages)
  @JoinColumn({name: 'conversationId'})
  conversation: Conversation;

  @Column({
    type: String,
    nullable: true
  })
  guestName: string;

  @Column({
    type: String,
    nullable: true
  })
  guestId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}