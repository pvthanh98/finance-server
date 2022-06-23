import { Server, Socket } from "socket.io";
import { MessageBroadcast } from "./types/message-socket";
export declare class ChatGateway {
    server: Server;
    handleMessage(client: Socket, data: MessageBroadcast): void;
}
