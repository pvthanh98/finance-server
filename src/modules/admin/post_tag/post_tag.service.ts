import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostTag } from 'src/entities/post-tag';
import { FormatPaginationQuery, formatPaginationResponse } from 'src/modules/utils/format-pagination';
import { PaginationQueryType } from 'src/types/common.type';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreatePostTagDto } from './dto/create-tag.dto';
import { UpdatePostTagDto } from './dto/update-tag.dto';

@Injectable()
export class PostTagService {
    constructor(
        @InjectRepository(PostTag)
        private postTagRepo: Repository<PostTag>,
        private postCategoryService: CategoryService
    ) { }

    async createTag(dto: CreatePostTagDto) {
        const category = await this.postCategoryService.findCategoryDetail(dto.postCategoryId);
        if(!category) throw new BadRequestException('Category not found');
        
        const tag = await this.postTagRepo.create({
            ...dto
        });
        await this.postTagRepo.save(tag);
        return tag;
    }

    async updateTag(id: string, dto: UpdatePostTagDto) {
        if(dto.postCategoryId) {
            const category = await this.postCategoryService.findCategoryDetail(dto.postCategoryId);
            if (!category) throw new BadRequestException('Category not found');
        }
        await this.postTagRepo.update({ id }, {
            ...dto
        });
        const tag = await this.postTagRepo.findOne({where:{id}})
        return tag;
    }

    async findTag(query: PaginationQueryType) {
        const formatQuery = FormatPaginationQuery(query)
        const tags = await this.postTagRepo.findAndCount({
            skip: formatQuery.offset,
            take: formatQuery.limit,
        });
        return formatPaginationResponse(tags, formatQuery)
    }

    async findTagDetail(id: string) {
        const tag = await this.postTagRepo.findOne({
            where:{
                id
            }
        });
        return tag;
    }
}
