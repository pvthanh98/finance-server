import { PaginationQueryType } from 'src/types/common.type';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-converation.dto';
import { UpdateConversationDto } from './dto/update-converation.dto';
export declare class ConversationController {
    private readonly conversationService;
    constructor(conversationService: ConversationService);
    createConversation(dto: CreateConversationDto): Promise<import("../../../entities/conversation").Conversation>;
    updateConversation(id: string, dto: UpdateConversationDto): Promise<import("../../../entities/conversation").Conversation>;
    getConversation(query: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
}
