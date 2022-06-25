import { Injectable } from "@nestjs/common";
import {
    ConnectedSocket,
    MessageBody, SubscribeMessage,
    WebSocketGateway, WebSocketServer,
    OnGatewayConnection
    
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import * as socketEvent from "./constants/socket-event.constant";
import { ChatService } from "./modules/chat/chat.service";
import { MessageBroadcast } from "./types/message-socket";

@WebSocketGateway({
    cors: true
})
@Injectable()
export class ChatGateway {
    constructor(private chatService: ChatService){}

    @WebSocketServer()
    server : Server;

    @SubscribeMessage(socketEvent.CLIENT_EMIT_BROADCAST_MESSAGE)
    handleMessage(client: Socket, data: MessageBroadcast): void {
        this.chatService.createPublicMessage({
            body: data.body,
            guestName: data.user.name,
            guestId: data.user.id
        })
        this.server.emit(socketEvent.SERVER_EMIT_BROADCAST_MESSAGE, data)
    }

}