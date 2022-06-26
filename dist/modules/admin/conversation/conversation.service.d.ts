import { Conversation } from 'src/entities/conversation';
import { Repository } from 'typeorm';
import { CreateConversationDto } from './dto/create-converation.dto';
import { UpdateConversationDto } from './dto/update-converation.dto';
import { PaginationQueryType } from 'src/types/common.type';
import { Message } from 'src/entities/message';
import { ConversationUser } from 'src/entities/conversation-user';
import { UserService } from 'src/modules/user/user.service';
export declare class ConversationService {
    private conversationRepository;
    private messageRepository;
    private conversationUserRepository;
    private userService;
    constructor(conversationRepository: Repository<Conversation>, messageRepository: Repository<Message>, conversationUserRepository: Repository<ConversationUser>, userService: UserService);
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
    findConversationBetweenUsers(userId: string, friendId: string): Promise<string>;
    createSingleConversation(userId: string, friendId: string): Promise<string>;
    findSocketIdsFromConversationId(conversationId: string): Promise<any[]>;
    updateLastMessage(conversationId: string, lastMessage: string): void;
}
