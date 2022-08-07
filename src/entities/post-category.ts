import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Post } from './post';
import { PostTag } from './post-tag';

@Entity()
export class PostCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  title: string;

  @OneToMany(()=> PostTag, postTags => postTags.postCategory)
  postTags: PostTag[];

  @OneToMany(()=> Post, posts => posts.postCategory)
  posts: Post[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}