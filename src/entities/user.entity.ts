import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({ type: Boolean, default: true })
  isActive: boolean;

  @Column({ type: Boolean, default: true })
  isAdmin: boolean;

  @Column({ type: String })
  password: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}