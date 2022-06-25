import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateConversationDto {
    @IsString()
    name: string;

    @IsBoolean()
    @IsOptional()
    isGroup: boolean
}