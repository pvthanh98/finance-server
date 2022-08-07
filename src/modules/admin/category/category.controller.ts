import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PaginationQueryPipe } from 'src/pipes/pagination-query.pipe';
import { PaginationQueryType } from 'src/types/common.type';
import { CategoryService } from './category.service';
import { CreatePostCategoryDto } from './dto/create-category.dto';
import { UpdatePostCategoryDto } from './dto/update-category.dto';

@Controller('admin/post-category')
export class CategoryController {
    constructor(private readonly postCategoryService: CategoryService){}

    @Get()
    getPostCategory(@Query(PaginationQueryPipe) query: PaginationQueryType){
        return this.postCategoryService.findCategory(query);
    }

    @Get(':id')
    getPostCategoryDetail(@Param('id') id: string){
        return this.postCategoryService.findCategoryDetail(id);
    }

    @Post()
    createPostCategory(@Body() categoryDto: CreatePostCategoryDto){
        return this.postCategoryService.createCategory(categoryDto);
    }

    @Put(':id')
    updatePostCategory(@Param('id') id: string, @Body() categoryDto: UpdatePostCategoryDto){
        return this.postCategoryService.updateCategory(id, categoryDto);
    }
}
