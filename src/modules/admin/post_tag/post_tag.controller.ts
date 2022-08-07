import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PaginationQueryPipe } from 'src/pipes/pagination-query.pipe';
import { PaginationQueryType } from 'src/types/common.type';
import { CreatePostTagDto } from './dto/create-tag.dto';
import { UpdatePostTagDto } from './dto/update-tag.dto';
import { PostTagService } from './post_tag.service';

@Controller('admin/post-tag')
export class PostTagController {
    constructor(private readonly postTagService: PostTagService){}

    @Get()
    getPostTag(@Query(PaginationQueryPipe) query: PaginationQueryType){
        return this.postTagService.findTag(query);
    }

    @Get(':id')
    getPostTagDetail(@Param('id') id: string){
        return this.postTagService.findTagDetail(id);
    }

    @Post()
    createPostTag(@Body() categoryDto: CreatePostTagDto){
        return this.postTagService.createTag(categoryDto);
    }

    @Put(':id')
    updatePostTag(@Param('id') id: string, @Body() categoryDto: UpdatePostTagDto){
        return this.postTagService.updateTag(id, categoryDto);
    }
}
