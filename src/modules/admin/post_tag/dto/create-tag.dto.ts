import { IsString } from "class-validator";

export class CreatePostTagDto {
    @IsString()
    title: string;

    @IsString()
    postCategoryId: string;
}