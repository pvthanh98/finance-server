import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationEnum } from 'src/constants/conversation-enum';
import { Conversation } from 'src/entities/conversation';
import { ConversationUser } from 'src/entities/conversation-user';
import { Message } from 'src/entities/message';
import { PaginationQueryType, UserPayload } from 'src/types/common.type';
import { Repository } from 'typeorm';
import { FormatPaginationQuery, formatPaginationResponse } from '../utils/format-pagination';
import { PublicMessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        @InjectRepository(Conversation)
        private conversationRepository: Repository<Conversation>,
        @InjectRepository(ConversationUser)
        private conversationUserRepository: Repository<ConversationUser>
    ) { }

    public async getPublicMessage(query: PaginationQueryType) {
        const { search } = query;
        const formatQuery = FormatPaginationQuery(query);

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
                name: ConversationEnum.PUBLIC_CONVERSATION_NAME
            })

        if (search)
            messageQuery.andWhere('message.body = :search', { search })

        const results = await messageQuery
            .orderBy('message.createdAt', 'DESC')
            .take(formatQuery.limit)
            .skip(formatQuery.offset)
            .getManyAndCount();

        return formatPaginationResponse(results, formatQuery)
    }

    public async createPublicMessage(dto: PublicMessageDto) {
        const conversation = await this.conversationRepository.findOne({
            where: { name: ConversationEnum.PUBLIC_CONVERSATION_NAME }
        });

        this.messageRepository
            .createQueryBuilder('message')
            .insert()
            .values({
                ...dto,
                conversation
            })
            .execute();
    }

    public async getConversation(query: PaginationQueryType, userReq: UserPayload) {
        /** 
         * STEP1 : Find  conversation ID belongs to users
         * STEP2 : FIND CONVERSATIONs
         */
        const formatQuery = FormatPaginationQuery(query)

        const conversationUserResponse = await this.conversationUserRepository.findAndCount({
            select: ['userId', 'id', 'conversationId'],
            where: {
                userId: userReq.sub
            },
            skip: formatQuery.offset,
            take: formatQuery.limit,
        });

        const conversationIds = conversationUserResponse[0].map(conversationUser => conversationUser.conversationId);

        const conversationQueryBuilder = await this.conversationRepository.createQueryBuilder('conversation')
        const conversations = await conversationQueryBuilder
            .innerJoinAndSelect(
                "conversation.conversationUsers",
                'ConversationUser'
            )
            .innerJoinAndSelect(
                'ConversationUser.user',
                'user'
            )
            .select([
                'conversation',
                'ConversationUser.id',
                'user.firstName',
                'user.lastName',
                'user.id',
                'user.image'
            ])
            .where('conversation.id IN (:...ids)', { ids: [...conversationIds] })
            .getMany()

        const customConversations = conversations.map(conv => {
            const partners = conv.conversationUsers.filter(convUser=> convUser.user.id !== userReq.sub)
            return {
                id: conv.id,
                lastMessage: conv.lastMessage,
                isGroup: conv.isGroup,
                createdAt: conv.createdAt,
                updatedAt: conv.updatedAt,
                partner: {...partners[0].user},
            }
        })



        return formatPaginationResponse(
            [customConversations, conversationUserResponse[1]],
            formatQuery
        );
    }
}
