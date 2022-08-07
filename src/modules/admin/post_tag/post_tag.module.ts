import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTag } from 'src/entities/post-tag';
import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/category.service';
import { PostTagController } from './post_tag.controller';
import { PostTagService } from './post_tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostTag]), CategoryModule],
  controllers: [PostTagController],
  providers: [PostTagService]
})
export class PostTagModule {}
