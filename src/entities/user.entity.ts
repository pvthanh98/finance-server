import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Friend } from './friend.entity';

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
    default: ''
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

  // @OneToMany(()=> Friend, friend => friend.friend)
  // friend_2: Friend[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}