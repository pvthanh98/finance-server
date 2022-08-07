import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCategory } from 'src/entities/post-category';
import { FormatPaginationQuery, formatPaginationResponse } from 'src/modules/utils/format-pagination';
import { PaginationQueryType } from 'src/types/common.type';
import { Repository } from 'typeorm';
import { CreatePostCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(PostCategory)
        private postCategoryService: Repository<PostCategory>
    ) { }

    async createCategory(dto: CreatePostCategoryDto) {
        const category = await this.postCategoryService.create({
            ...dto
        });
        await this.postCategoryService.save(category);
        return category;
    }

    async updateCategory(id: string, dto: CreatePostCategoryDto) {
        await this.postCategoryService.update({ id }, {
            ...dto
        });
        const category = await this.postCategoryService.findOne({where:{id}})
        return category;
    }

    async findCategory(query: PaginationQueryType) {
        const formatQuery = FormatPaginationQuery(query)
        const categories = await this.postCategoryService.findAndCount({
            skip: formatQuery.offset,
            take: formatQuery.limit,
        });
        return formatPaginationResponse(categories, formatQuery)
    }

    async findCategoryDetail(id: string) {
        const category = await this.postCategoryService.findOne({
            where:{
                id
            }
        });
        return category;
    }
}
