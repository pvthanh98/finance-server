import { Conversation } from './conversation';
import { User } from './user.entity';
export declare class Message {
    id: string;
    body: string;
    type: string;
    fromUser: User;
    conversation: Conversation;
    guestName: string;
    guestId: string;
    createdAt: string;
    updatedAt: string;
}
