import { Conversation } from './conversation';
import { User } from './user.entity';
export declare class ConversationUser {
    id: string;
    user: User;
    conversation: Conversation;
    createdAt: string;
    updatedAt: string;
}