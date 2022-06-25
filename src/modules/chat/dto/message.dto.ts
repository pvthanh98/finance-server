import { IsString, IsIn, IsOptional } from "class-validator";
import { MessageTypeEnum } from "src/constants/message-enum";

export class PublicMessageDto {
    @IsString()
    body: string;

    @IsString()
    @IsOptional()
    guestName?: string;

    @IsString()
    @IsOptional()
    guestId?: string;

    @IsIn([
        MessageTypeEnum.IMAGE,
        MessageTypeEnum.TEXT,
        MessageTypeEnum.VIDEO,
    ])
    @IsOptional()
    type?: MessageTypeEnum;
}