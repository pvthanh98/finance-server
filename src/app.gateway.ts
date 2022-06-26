import { Injectable } from "@nestjs/common";
import {
    ConnectedSocket,
    MessageBody, SubscribeMessage,
    WebSocketGateway, WebSocketServer,
    OnGatewayConnection

} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessageTypeEnum } from "./constants/message-enum";
import * as socketEvent from "./constants/socket-event.constant";
import { ConversationService } from "./modules/admin/conversation/conversation.service";
import { jwtConstants } from "./modules/auth/constants";
import { JwtStrategy } from "./modules/auth/jwt.strategy";
import { ChatService } from "./modules/chat/chat.service";
import { UserService } from "./modules/user/user.service";
import { MessageBroadcast, MessagePrivate } from "./types/message-socket";
import { AuthType } from "./types/socket-common";
const jwt = require('jsonwebtoken');


interface SocketAuth extends Socket {
    isAuth?: boolean,
    sub?: string;
}

@WebSocketGateway({
    cors: true
})
@Injectable()
export class ChatGateway {
    constructor(
        private chatService: ChatService,
        private userService: UserService,
        private conversationSerice: ConversationService
    ) { }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage(socketEvent.TEST_EVENT)
    testEvent(client: SocketAuth, data: any) {
        console.log(client.isAuth)
    }

    @SubscribeMessage(socketEvent.CLIENT_EMIT_BROADCAST_MESSAGE)
    handleMessage(client: Socket, data: MessageBroadcast): void {
        this.chatService.createPublicMessage({
            body: data.body,
            guestName: data.user.name,
            guestId: data.user.id
        })
        this.server.emit(socketEvent.SERVER_EMIT_BROADCAST_MESSAGE, {
            ...data,
            createdAt: new Date().toISOString()
        })
    }


    @SubscribeMessage(socketEvent.CLIENT_EMIT_AUTH)
    authenticate(client: SocketAuth, data: AuthType): void {
        try {
            var decoded = jwt.verify(data.token, jwtConstants.secret);
            client.isAuth=true;
            client.sub=decoded.sub;
            this.userService.updateSocketId(decoded.sub, client.id)
            console.log("Socket Authenticated")
          } catch(err) {
            client.isAuth = false;
            console.log("Socket Authentication Failed")
          }
    }



    @SubscribeMessage(socketEvent.CLIENT_EMIT_PRIVATE_MESSAGE)
    async clientEmitPrivateMessage(client: SocketAuth, data: MessagePrivate) {
        if (client.isAuth){
            const socketIds = await this.conversationSerice.findSocketIdsFromConversationId(data.conversationId)
            const now = new Date().toISOString()
            this.server.to(socketIds).emit(
                socketEvent.SERVER_EMIT_PRIVATE_MESSAGE,
                {
                    ...data,
                    createdAt: now,
                    updatedAt: now,
                }
            )
            this.chatService.saveMessage({
                body: data.body,
                conversationId: data.conversationId,
                fromUserId: client.sub,
                type: data.type as MessageTypeEnum
            })
        } else {
            console.log("Status 401")
        }
    }

}