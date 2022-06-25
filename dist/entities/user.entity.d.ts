import { ConversationUser } from './conversation-user';
import { Friend } from './friend.entity';
import { Message } from './message';
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    isActive: boolean;
    isAdmin: boolean;
    password: string;
    friends: Friend[];
    conversationUsers: ConversationUser[];
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}
