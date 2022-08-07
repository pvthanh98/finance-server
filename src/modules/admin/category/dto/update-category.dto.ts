import { IsString } from "class-validator";

export class UpdatePostCategoryDto {
    @IsString()
    title: string;
}