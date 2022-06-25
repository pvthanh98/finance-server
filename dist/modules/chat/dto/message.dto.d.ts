import { MessageTypeEnum } from "src/constants/message-enum";
export declare class PublicMessageDto {
    body: string;
    guestName?: string;
    guestId?: string;
    type?: MessageTypeEnum;
}
