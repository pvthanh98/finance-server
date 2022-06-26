import { Conversation } from './conversation';
import { User } from './user.entity';
export declare class ConversationUser {
    id: string;
    userId: string;
    user: User;
    conversationId: string;
    conversation: Conversation;
    createdAt: string;
    updatedAt: string;
}
