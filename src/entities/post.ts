import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { PostCategory } from './post-category';
import { PostTag } from './post-tag';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  title: string;

  @Column({ type: String, unique: true })
  slug: string;

  @Column({ type: String })
  image: string;

  @Column({ type: String })
  body: string;

  @Column({ type: String })
  postCategoryId: string;

  @ManyToOne(()=> PostCategory, postCategory=> postCategory.posts)
  @JoinColumn({ name: 'postCategoryId' })
  postCategory: PostCategory;

  @ManyToMany(() => PostTag)
  @JoinTable()
  postTags: PostTag[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}