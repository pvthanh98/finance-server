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
exports.ConversationUser = void 0;
const typeorm_1 = require("typeorm");
const conversation_1 = require("./conversation");
const user_entity_1 = require("./user.entity");
let ConversationUser = class ConversationUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ConversationUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.conversationUsers),
    __metadata("design:type", user_entity_1.User)
], ConversationUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], ConversationUser.prototype, "conversationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conversation_1.Conversation, conversation => conversation.conversationUsers),
    (0, typeorm_1.JoinColumn)({ name: 'conversationId' }),
    __metadata("design:type", conversation_1.Conversation)
], ConversationUser.prototype, "conversation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], ConversationUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], ConversationUser.prototype, "updatedAt", void 0);
ConversationUser = __decorate([
    (0, typeorm_1.Entity)()
], ConversationUser);
exports.ConversationUser = ConversationUser;
//# sourceMappingURL=conversation-user.js.map