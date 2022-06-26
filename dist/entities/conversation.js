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
exports.Conversation = void 0;
const typeorm_1 = require("typeorm");
const conversation_user_1 = require("./conversation-user");
const message_1 = require("./message");
let Conversation = class Conversation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Conversation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: String
    }),
    __metadata("design:type", String)
], Conversation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: String,
        default: ''
    }),
    __metadata("design:type", String)
], Conversation.prototype, "lastMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: Boolean,
        default: false
    }),
    __metadata("design:type", Boolean)
], Conversation.prototype, "isGroup", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => conversation_user_1.ConversationUser, conversationUsers => conversationUsers.conversation),
    __metadata("design:type", Array)
], Conversation.prototype, "conversationUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_1.Message, message => message.conversation),
    __metadata("design:type", Array)
], Conversation.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Conversation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], Conversation.prototype, "updatedAt", void 0);
Conversation = __decorate([
    (0, typeorm_1.Entity)()
], Conversation);
exports.Conversation = Conversation;
//# sourceMappingURL=conversation.js.map