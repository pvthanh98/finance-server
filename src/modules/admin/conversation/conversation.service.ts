import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation';
import { Repository } from 'typeorm';
import { CreateConversationDto } from './dto/create-converation.dto';
import { UpdateConversationDto } from './dto/update-converation.dto';
import { ConversationEnum } from '../../../constants/conversation-enum';
import { PaginationQueryType } from 'src/types/common.type';
import { FormatPaginationQuery, formatPaginationResponse } from 'src/modules/utils/format-pagination';
import { Message } from 'src/entities/message';

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(Conversation)
        private conversationRepository: Repository<Conversation>,
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) { }

    private async checkNameExist(name: string | null | undefined) : Promise<boolean>{
        if (!name) return true;
        if (name.includes(ConversationEnum.ROOT_PREFIX)) {
            /** FIND WHETHER THE NAME EXIST */
            const conversationExist = await this.conversationRepository.findOne({ where: { name: name } });
            if (conversationExist) throw new BadRequestException("The root conversation existed")
        }
        return true;
    }

    public async createConversation(dto: CreateConversationDto) {
        await this.checkNameExist(dto.name);

        const conversation = this.conversationRepository.create({
            ...dto
        });
        await this.conversationRepository.save(conversation);
        return conversation;
    }

    public async updateConversation(id: string, dto: UpdateConversationDto) {
        await this.checkNameExist(dto.name);

        await this.conversationRepository.update(
            {
                id: id
            },
            {
                ...dto
            }
        )
        const conversation = await this.conversationRepository.findOne({
            where: { id }
        });
        return conversation;
    }

    public async getConversation(query: PaginationQueryType) {
        const { search } = query;
        const formatQuery = FormatPaginationQuery(query);
        let conversationQueryBuilber = this.conversationRepository.createQueryBuilder("conversation")
            .select()

        if (search) {
            conversationQueryBuilber
                .where("LOWER(conversation.name) ILIKE %LOWER(:search)%", { search })
        }

        conversationQueryBuilber
            .skip(formatQuery.offset)
            .limit(formatQuery.limit)

        let resulst = await conversationQueryBuilber.getManyAndCount();
        return formatPaginationResponse(resulst, formatQuery);
    }

    public async deleteAllMessage () {

    }
}
