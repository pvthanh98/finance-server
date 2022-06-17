import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Log {
  /** Use to logs */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: String
  })
  message: string;

  @Column({
    type: String,
    default:"PING"
  })
  type: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}