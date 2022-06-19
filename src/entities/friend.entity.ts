import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(()=> User, user=> user.friends)
  user: User;

  @ManyToOne(()=> User, user=> user.friends)
  friend: User;

  @Column({
    type: String,
    default:"send_request"
  })
  status: string; //friend, send_request

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}