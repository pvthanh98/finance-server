import { Optional } from "@nestjs/common";
import { IsString } from "class-validator";

export class UpdatePostTagDto {
    @IsString()
    title: string;

    @IsString()
    @Optional()
    postCategoryId: string;
}