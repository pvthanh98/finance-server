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
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const conversation_1 = require("../../../entities/conversation");
const typeorm_2 = require("typeorm");
const conversation_enum_1 = require("../../../constants/conversation-enum");
const format_pagination_1 = require("../../utils/format-pagination");
const message_1 = require("../../../entities/message");
let ConversationService = class ConversationService {
    constructor(conversationRepository, messageRepository) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
    }
    async checkNameExist(name) {
        if (!name)
            return true;
        if (name.includes(conversation_enum_1.ConversationEnum.ROOT_PREFIX)) {
            const conversationExist = await this.conversationRepository.findOne({ where: { name: name } });
            if (conversationExist)
                throw new common_1.BadRequestException("The root conversation existed");
        }
        return true;
    }
    async createConversation(dto) {
        await this.checkNameExist(dto.name);
        const conversation = this.conversationRepository.create(Object.assign({}, dto));
        await this.conversationRepository.save(conversation);
        return conversation;
    }
    async updateConversation(id, dto) {
        await this.checkNameExist(dto.name);
        await this.conversationRepository.update({
            id: id
        }, Object.assign({}, dto));
        const conversation = await this.conversationRepository.findOne({
            where: { id }
        });
        return conversation;
    }
    async getConversation(query) {
        const { search } = query;
        const formatQuery = (0, format_pagination_1.FormatPaginationQuery)(query);
        let conversationQueryBuilber = this.conversationRepository.createQueryBuilder("conversation")
            .select();
        if (search) {
            conversationQueryBuilber
                .where("LOWER(conversation.name) ILIKE %LOWER(:search)%", { search });
        }
        conversationQueryBuilber
            .skip(formatQuery.offset)
            .limit(formatQuery.limit);
        let resulst = await conversationQueryBuilber.getManyAndCount();
        return (0, format_pagination_1.formatPaginationResponse)(resulst, formatQuery);
    }
    async deleteAllMessage() {
    }
};
ConversationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conversation_1.Conversation)),
    __param(1, (0, typeorm_1.InjectRepository)(message_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ConversationService);
exports.ConversationService = ConversationService;
//# sourceMappingURL=conversation.service.js.map