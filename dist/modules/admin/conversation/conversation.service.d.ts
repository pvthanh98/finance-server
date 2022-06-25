import { Conversation } from 'src/entities/conversation';
import { Repository } from 'typeorm';
import { CreateConversationDto } from './dto/create-converation.dto';
import { UpdateConversationDto } from './dto/update-converation.dto';
import { PaginationQueryType } from 'src/types/common.type';
import { Message } from 'src/entities/message';
export declare class ConversationService {
    private conversationRepository;
    private messageRepository;
    constructor(conversationRepository: Repository<Conversation>, messageRepository: Repository<Message>);
    private checkNameExist;
    createConversation(dto: CreateConversationDto): Promise<Conversation>;
    updateConversation(id: string, dto: UpdateConversationDto): Promise<Conversation>;
    getConversation(query: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
    deleteAllMessage(): Promise<void>;
}
