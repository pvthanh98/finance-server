"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const socketEvent = require("./constants/socket-event.constant");
const conversation_service_1 = require("./modules/admin/conversation/conversation.service");
const constants_1 = require("./modules/auth/constants");
const chat_service_1 = require("./modules/chat/chat.service");
const user_service_1 = require("./modules/user/user.service");
const jwt = require('jsonwebtoken');
let ChatGateway = class ChatGateway {
    constructor(chatService, userService, conversationSerice) {
        this.chatService = chatService;
        this.userService = userService;
        this.conversationSerice = conversationSerice;
    }
    testEvent(client, data) {
        console.log(client.isAuth);
    }
    handleMessage(client, data) {
        this.chatService.createPublicMessage({
            body: data.body,
            guestName: data.user.name,
            guestId: data.user.id
        });
        this.server.emit(socketEvent.SERVER_EMIT_BROADCAST_MESSAGE, Object.assign(Object.assign({}, data), { createdAt: new Date().toISOString() }));
    }
    authenticate(client, data) {
        try {
            var decoded = jwt.verify(data.token, constants_1.jwtConstants.secret);
            client.isAuth = true;
            client.sub = decoded.sub;
            client.partnerSocketIds = [];
            this.userService.updateSocketId(decoded.sub, client.id);
            console.log("Socket Authenticated");
        }
        catch (err) {
            client.isAuth = false;
            console.log("Socket Authentication Failed");
        }
    }
    async clientEmitPrivateMessage(client, data) {
        if (client.isAuth) {
            let toSocketIds = [];
            if (client.partnerSocketIds.length === 0) {
                toSocketIds = await this.conversationSerice.findSocketIdsFromConversationId(data.conversationId);
                client.partnerSocketIds = [...toSocketIds];
            }
            else {
                toSocketIds = [...client.partnerSocketIds];
            }
            const now = new Date().toISOString();
            this.server.to(toSocketIds).emit(socketEvent.SERVER_EMIT_PRIVATE_MESSAGE, Object.assign(Object.assign({}, data), { createdAt: now, updatedAt: now }));
            this.chatService.saveMessage({
                body: data.body,
                conversationId: data.conversationId,
                fromUserId: client.sub,
                type: data.type
            });
            this.conversationSerice.updateLastMessage(data.conversationId, data.body);
        }
        else {
            console.log("Status 401");
        }
    }
    async clientEmitTyping(client, data) {
        if (client.isAuth) {
            let toSocketIds = [];
            if (client.partnerSocketIds.length === 0) {
                toSocketIds = await this.conversationSerice.findSocketIdsFromConversationId(data.conversationId);
                client.partnerSocketIds = [...toSocketIds];
            }
            else {
                toSocketIds = [...client.partnerSocketIds];
            }
            this.server.to(toSocketIds).emit(socketEvent.SERVER_EMIT_TYPING, '');
        }
        else {
            console.log("Status 401");
        }
    }
    async clientEmitNotTyping(client, data) {
        if (client.isAuth) {
            let toSocketIds = [];
            if (client.partnerSocketIds.length === 0) {
                toSocketIds = await this.conversationSerice.findSocketIdsFromConversationId(data.conversationId);
                client.partnerSocketIds = [...toSocketIds];
            }
            else {
                toSocketIds = [...client.partnerSocketIds];
            }
            this.server.to(toSocketIds).emit(socketEvent.SERVER_EMIT_NOT_TYPING, '');
        }
        else {
            console.log("Status 401");
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(socketEvent.TEST_EVENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "testEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(socketEvent.CLIENT_EMIT_BROADCAST_MESSAGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(socketEvent.CLIENT_EMIT_AUTH),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "authenticate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(socketEvent.CLIENT_EMIT_PRIVATE_MESSAGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "clientEmitPrivateMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(socketEvent.CLIENT_EMIT_TYPING),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "clientEmitTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(socketEvent.CLIENT_EMIT_NOT_TYPING),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "clientEmitNotTyping", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: true
    }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        user_service_1.UserService,
        conversation_service_1.ConversationService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=app.gateway.js.map