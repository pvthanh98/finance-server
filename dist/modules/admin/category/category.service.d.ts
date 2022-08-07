import { PostCategory } from 'src/entities/post-category';
import { PaginationQueryType } from 'src/types/common.type';
import { Repository } from 'typeorm';
import { CreatePostCategoryDto } from './dto/create-category.dto';
export declare class CategoryService {
    private postCategoryService;
    constructor(postCategoryService: Repository<PostCategory>);
    createCategory(dto: CreatePostCategoryDto): Promise<PostCategory>;
    updateCategory(id: string, dto: CreatePostCategoryDto): Promise<PostCategory>;
    findCategory(query: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
    findCategoryDetail(id: string): Promise<PostCategory>;
}
