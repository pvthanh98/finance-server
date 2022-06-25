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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationController = void 0;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../../../guards/admin.guard");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const pagination_query_pipe_1 = require("../../../pipes/pagination-query.pipe");
const conversation_service_1 = require("./conversation.service");
const create_converation_dto_1 = require("./dto/create-converation.dto");
const update_converation_dto_1 = require("./dto/update-converation.dto");
let ConversationController = class ConversationController {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    createConversation(dto) {
        return this.conversationService.createConversation(dto);
    }
    updateConversation(id, dto) {
        return this.conversationService.updateConversation(id, dto);
    }
    getConversation(query) {
        return this.conversationService.getConversation(query);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_converation_dto_1.CreateConversationDto]),
    __metadata("design:returntype", void 0)
], ConversationController.prototype, "createConversation", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_converation_dto_1.UpdateConversationDto]),
    __metadata("design:returntype", void 0)
], ConversationController.prototype, "updateConversation", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PaginationQueryPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConversationController.prototype, "getConversation", null);
ConversationController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Controller)('admin/conversation'),
    __metadata("design:paramtypes", [conversation_service_1.ConversationService])
], ConversationController);
exports.ConversationController = ConversationController;
//# sourceMappingURL=conversation.controller.js.map