import { PostTag } from 'src/entities/post-tag';
import { PaginationQueryType } from 'src/types/common.type';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreatePostTagDto } from './dto/create-tag.dto';
import { UpdatePostTagDto } from './dto/update-tag.dto';
export declare class PostTagService {
    private postTagRepo;
    private postCategoryService;
    constructor(postTagRepo: Repository<PostTag>, postCategoryService: CategoryService);
    createTag(dto: CreatePostTagDto): Promise<PostTag>;
    updateTag(id: string, dto: UpdatePostTagDto): Promise<PostTag>;
    findTag(query: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
    findTagDetail(id: string): Promise<PostTag>;
}
