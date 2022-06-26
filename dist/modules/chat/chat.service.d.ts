import { Conversation } from 'src/entities/conversation';
import { ConversationUser } from 'src/entities/conversation-user';
import { Message } from 'src/entities/message';
import { PaginationQueryType, UserPayload } from 'src/types/common.type';
import { Repository } from 'typeorm';
import { PublicMessageDto } from './dto/message.dto';
export declare class ChatService {
    private messageRepository;
    private conversationRepository;
    private conversationUserRepository;
    constructor(messageRepository: Repository<Message>, conversationRepository: Repository<Conversation>, conversationUserRepository: Repository<ConversationUser>);
    getPublicMessage(query: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
    createPublicMessage(dto: PublicMessageDto): Promise<void>;
    getConversation(query: PaginationQueryType, userReq: UserPayload): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
}
