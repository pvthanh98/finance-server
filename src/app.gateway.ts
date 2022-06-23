import {
    ConnectedSocket,
    MessageBody, SubscribeMessage,
    WebSocketGateway, WebSocketServer,
    OnGatewayConnection
    
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import * as socketEvent from "./constants/socket-event.constant";
import { MessageBroadcast } from "./types/message-socket";

@WebSocketGateway({
    cors: true
})
export class ChatGateway {

    @WebSocketServer()
    server : Server;

    @SubscribeMessage(socketEvent.CLIENT_EMIT_BROADCAST_MESSAGE)
    handleMessage(client: Socket, data: MessageBroadcast): void {
        this.server.emit(socketEvent.SERVER_EMIT_BROADCAST_MESSAGE, data)
    }

}