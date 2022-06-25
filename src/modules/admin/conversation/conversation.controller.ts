import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { PaginationQueryPipe } from 'src/pipes/pagination-query.pipe';
import { PaginationQueryType } from 'src/types/common.type';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-converation.dto';
import { UpdateConversationDto } from './dto/update-converation.dto';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/conversation')

export class ConversationController {
    constructor(private readonly conversationService: ConversationService) { }

    @Post()
    createConversation(@Body() dto: CreateConversationDto) {
        return this.conversationService.createConversation(dto);
    }

    @Put(':id')
    updateConversation(@Param('id') id: string, @Body() dto: UpdateConversationDto) {
        return this.conversationService.updateConversation(id, dto);
    }

    @Get()
    getConversation(@Query(PaginationQueryPipe) query: PaginationQueryType) {
        return this.conversationService.getConversation(query)
    }      
}
