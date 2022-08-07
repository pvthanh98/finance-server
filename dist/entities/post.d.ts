import { PostCategory } from './post-category';
import { PostTag } from './post-tag';
export declare class Post {
    id: string;
    title: string;
    slug: string;
    image: string;
    body: string;
    postCategoryId: string;
    postCategory: PostCategory;
    postTags: PostTag[];
    createdAt: string;
    updatedAt: string;
}
