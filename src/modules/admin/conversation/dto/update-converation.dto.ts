import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateConversationDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsBoolean()
    @IsOptional()
    isGroup: boolean
}