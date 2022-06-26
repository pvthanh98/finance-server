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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const conversation_enum_1 = require("../../constants/conversation-enum");
const conversation_1 = require("../../entities/conversation");
const conversation_user_1 = require("../../entities/conversation-user");
const message_1 = require("../../entities/message");
const typeorm_2 = require("typeorm");
const format_pagination_1 = require("../utils/format-pagination");
let ChatService = class ChatService {
    constructor(messageRepository, conversationRepository, conversationUserRepository) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
        this.conversationUserRepository = conversationUserRepository;
    }
    async getPublicMessage(query) {
        const { search } = query;
        const formatQuery = (0, format_pagination_1.FormatPaginationQuery)(query);
        const messageQuery = this.messageRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.conversation', 'conversation')
            .select([
            'message.id',
            'message.body',
            'message.type',
            'message.guestName',
            'message.guestId',
            'message.conversation',
            'message.createdAt',
            'message.updatedAt',
            'conversation.id',
            'conversation.name',
        ])
            .where('conversation.name = :name', {
            name: conversation_enum_1.ConversationEnum.PUBLIC_CONVERSATION_NAME
        });
        if (search)
            messageQuery.andWhere('message.body = :search', { search });
        const results = await messageQuery
            .orderBy('message.createdAt', 'DESC')
            .take(formatQuery.limit)
            .skip(formatQuery.offset)
            .getManyAndCount();
        return (0, format_pagination_1.formatPaginationResponse)(results, formatQuery);
    }
    async createPublicMessage(dto) {
        const conversation = await this.conversationRepository.findOne({
            where: { name: conversation_enum_1.ConversationEnum.PUBLIC_CONVERSATION_NAME }
        });
        this.messageRepository
            .createQueryBuilder('message')
            .insert()
            .values(Object.assign(Object.assign({}, dto), { conversation }))
            .execute();
    }
    async getConversation(query, userReq) {
        const formatQuery = (0, format_pagination_1.FormatPaginationQuery)(query);
        const conversationUserResponse = await this.conversationUserRepository.findAndCount({
            select: ['userId', 'id', 'conversationId'],
            where: {
                userId: userReq.sub
            },
            skip: formatQuery.offset,
            take: formatQuery.limit,
        });
        const conversationIds = conversationUserResponse[0].map(conversationUser => conversationUser.conversationId);
        const conversationQueryBuilder = await this.conversationRepository.createQueryBuilder('conversation');
        const conversations = await conversationQueryBuilder
            .innerJoinAndSelect("conversation.conversationUsers", 'ConversationUser')
            .innerJoinAndSelect('ConversationUser.user', 'user')
            .select([
            'conversation',
            'ConversationUser.id',
            'user.firstName',
            'user.lastName',
            'user.id',
            'user.image'
        ])
            .where('conversation.id IN (:...ids)', { ids: [...conversationIds] })
            .getMany();
        const customConversations = conversations.map(conv => {
            const partners = conv.conversationUsers.filter(convUser => convUser.user.id !== userReq.sub);
            return {
                id: conv.id,
                lastMessage: conv.lastMessage,
                isGroup: conv.isGroup,
                createdAt: conv.createdAt,
                updatedAt: conv.updatedAt,
                partner: Object.assign({}, partners[0].user),
            };
        });
        return (0, format_pagination_1.formatPaginationResponse)([customConversations, conversationUserResponse[1]], formatQuery);
    }
    async getConversationMessages(conversationId, query, userReq) {
        const formatQuery = (0, format_pagination_1.FormatPaginationQuery)(query);
        const conversation = await this.conversationRepository.createQueryBuilder('conversation')
            .innerJoinAndSelect("conversation.conversationUsers", 'ConversationUser')
            .select([
            'conversation.id',
            'ConversationUser.userId',
        ])
            .where('conversation.id = :conversationId', { conversationId })
            .andWhere('ConversationUser.userId = :sub', { sub: userReq.sub })
            .getOne();
        if (!conversation)
            throw new common_1.NotFoundException("Not found");
        const messages = await this.messageRepository.createQueryBuilder('message')
            .innerJoinAndSelect('message.fromUser', 'user')
            .select([
            'message.id',
            'message.body',
            'message.createdAt',
            'message.updatedAt',
            'message.type',
            'user.id',
            'user.firstName',
            'user.lastName',
            'user.image'
        ])
            .skip(formatQuery.offset)
            .take(formatQuery.limit)
            .getManyAndCount();
        return (0, format_pagination_1.formatPaginationResponse)(messages, formatQuery);
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_1.Message)),
    __param(1, (0, typeorm_1.InjectRepository)(conversation_1.Conversation)),
    __param(2, (0, typeorm_1.InjectRepository)(conversation_user_1.ConversationUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map