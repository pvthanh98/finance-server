import { PaginationQueryType } from 'src/types/common.type';
import { CategoryService } from './category.service';
import { CreatePostCategoryDto } from './dto/create-category.dto';
import { UpdatePostCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly postCategoryService;
    constructor(postCategoryService: CategoryService);
    getPostCategory(query: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
    getPostCategoryDetail(id: string): Promise<import("../../../entities/post-category").PostCategory>;
    createPostCategory(categoryDto: CreatePostCategoryDto): Promise<import("../../../entities/post-category").PostCategory>;
    updatePostCategory(id: string, categoryDto: UpdatePostCategoryDto): Promise<import("../../../entities/post-category").PostCategory>;
}
