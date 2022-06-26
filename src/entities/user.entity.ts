import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ConversationUser } from './conversation-user';
import { Friend } from './friend.entity';
import { Message } from './message';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: String
  })
  firstName: string;

  @Column({
    type: String
  })
  lastName: string;

  @Column({
    type: String
  })
  email: string;

  @Column({
    type: String,
    default: 'https://tp-finance-server.herokuapp.com/static/default-profile-icon.jpg'
  })
  image: string;

  @Column({ type: Boolean, default: true })
  isActive: boolean;

  @Column({ type: Boolean, default: false })
  isAdmin: boolean;

  @Column({ type: String, select:false })
  password: string;

  @OneToMany(()=> Friend, friend => friend.user)
  friends: Friend[];

  @OneToMany(()=> ConversationUser, conversationUser => conversationUser.user)
  conversationUsers: ConversationUser[];

  @OneToMany(()=> Message, message => message.fromUser)
  messages: Message[];

  @Column({
    type: String,
    nullable:true,
  })
  socketId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}