import { MessageTypeEnum } from "src/constants/message-enum";
export declare class PublicMessageDto {
    body: string;
    guestName?: string;
    guestId?: string;
    type?: MessageTypeEnum;
}
export declare class PrivateSocketMessageDto {
    body: string;
    type?: MessageTypeEnum;
    fromUserId: string;
    conversationId: string;
}
