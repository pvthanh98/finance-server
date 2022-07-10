import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Auth {
  /** Use to logs */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: String
  })
  code: string;

  @Column({name: 'userId', type: String})
  userId: string;

  @ManyToOne(() => User, user => user.auth)
  @JoinColumn({name: 'userId'})
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}