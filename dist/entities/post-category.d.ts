import { Post } from './post';
import { PostTag } from './post-tag';
export declare class PostCategory {
    id: string;
    title: string;
    postTags: PostTag[];
    posts: Post[];
    createdAt: string;
    updatedAt: string;
}
