import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationEnum } from 'src/constants/conversation-enum';
import { Conversation } from 'src/entities/conversation';
import { Message } from 'src/entities/message';
import { PaginationQueryType } from 'src/types/common.type';
import { Repository } from 'typeorm';
import { FormatPaginationQuery, formatPaginationResponse } from '../utils/format-pagination';
import { PublicMessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        @InjectRepository(Conversation)
        private conversationRepository: Repository<Conversation>
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

        console.log("CREATE MESSAGE")
        this.messageRepository
            .createQueryBuilder('message')
            .insert()
            .values({
                ...dto,
                conversation
            })
            .execute();
    }
}
