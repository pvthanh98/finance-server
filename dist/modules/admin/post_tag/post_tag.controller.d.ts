import { PaginationQueryType } from 'src/types/common.type';
import { CreatePostTagDto } from './dto/create-tag.dto';
import { UpdatePostTagDto } from './dto/update-tag.dto';
import { PostTagService } from './post_tag.service';
export declare class PostTagController {
    private readonly postTagService;
    constructor(postTagService: PostTagService);
    getPostTag(query: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
    getPostTagDetail(id: string): Promise<import("../../../entities/post-tag").PostTag>;
    createPostTag(categoryDto: CreatePostTagDto): Promise<import("../../../entities/post-tag").PostTag>;
    updatePostTag(id: string, categoryDto: UpdatePostTagDto): Promise<import("../../../entities/post-tag").PostTag>;
}
