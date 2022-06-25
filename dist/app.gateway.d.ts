import { Server, Socket } from "socket.io";
import { ChatService } from "./modules/chat/chat.service";
import { MessageBroadcast } from "./types/message-socket";
export declare class ChatGateway {
    private chatService;
    constructor(chatService: ChatService);
    server: Server;
    handleMessage(client: Socket, data: MessageBroadcast): void;
}
