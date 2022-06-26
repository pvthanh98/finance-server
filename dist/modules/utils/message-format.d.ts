import { Message } from "src/entities/message";
export declare const FormatMessageOwner: (messages: Array<Message>, userId: any) => {
    fromUser: {
        isMe: boolean;
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        image: string;
        isActive: boolean;
        isAdmin: boolean;
        password: string;
        friends: import("../../entities/friend.entity").Friend[];
        conversationUsers: import("../../entities/conversation-user").ConversationUser[];
        messages: Message[];
        createdAt: string;
        updatedAt: string;
    };
    id: string;
    body: string;
    type: string;
    conversationId: string;
    conversation: import("../../entities/conversation").Conversation;
    guestName: string;
    guestId: string;
    createdAt: string;
    updatedAt: string;
}[];
