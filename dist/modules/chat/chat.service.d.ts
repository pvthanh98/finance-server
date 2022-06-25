import { Conversation } from 'src/entities/conversation';
import { Message } from 'src/entities/message';
import { PaginationQueryType } from 'src/types/common.type';
import { Repository } from 'typeorm';
import { PublicMessageDto } from './dto/message.dto';
export declare class ChatService {
    private messageRepository;
    private conversationRepository;
    constructor(messageRepository: Repository<Message>, conversationRepository: Repository<Conversation>);
    getPublicMessage(query: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
    createPublicMessage(dto: PublicMessageDto): Promise<void>;
}
