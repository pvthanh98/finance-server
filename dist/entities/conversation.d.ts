import { ConversationUser } from './conversation-user';
import { Message } from './message';
export declare class Conversation {
    id: string;
    name: string;
    isGroup: boolean;
    conversationUsers: ConversationUser[];
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}
