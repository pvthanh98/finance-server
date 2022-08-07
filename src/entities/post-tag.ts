import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Post } from './post';
import { PostCategory } from './post-category';

@Entity()
export class PostTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  title: string;

  @Column({ type: String })
  postCategoryId: string;

  @ManyToOne(()=> PostCategory, postCategory=> postCategory.postTags)
  @JoinColumn({ name: 'postCategoryId' })
  postCategory: PostCategory;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}