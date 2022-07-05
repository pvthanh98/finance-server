import { Server, Socket } from "socket.io";
import { ConversationService } from "./modules/admin/conversation/conversation.service";
import { ChatService } from "./modules/chat/chat.service";
import { UserService } from "./modules/user/user.service";
import { MessagePrivate } from "./types/message-socket";
import { AuthType } from "./types/socket-common";
interface SocketAuth extends Socket {
    isAuth?: boolean;
    sub?: string;
    partnerSocketIds?: string[];
}
export declare class ChatGateway {
    private chatService;
    private userService;
    private conversationSerice;
    constructor(chatService: ChatService, userService: UserService, conversationSerice: ConversationService);
    server: Server;
    testEvent(client: SocketAuth, data: any): void;
    authenticate(client: SocketAuth, data: AuthType): void;
    clientEmitPrivateMessage(client: SocketAuth, data: MessagePrivate): Promise<void>;
    clientEmitTyping(client: SocketAuth, data: any): Promise<void>;
    clientEmitNotTyping(client: SocketAuth, data: any): Promise<void>;
}
export {};
