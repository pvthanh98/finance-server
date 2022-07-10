import { IsString } from "class-validator";

export class SignUrlDto {
    @IsString()
    key: string;
}