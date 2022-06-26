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
import { ConversationUser } from 'src/entities/conversation-user';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(Conversation)
        private conversationRepository: Repository<Conversation>,
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        @InjectRepository(ConversationUser)
        private conversationUserRepository: Repository<ConversationUser>,
        private userService: UserService,

    ) { }

    private async checkNameExist(name: string | null | undefined): Promise<boolean> {
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

    public async deleteAllMessage() {

    }

    public async findConversationBetweenUsers(userId: string, friendId: string) {

        const conversationUser1 = await this.conversationUserRepository
            .createQueryBuilder('conversationUser1')
            .innerJoinAndSelect('conversationUser1.user', 'user')
            .select([
                'conversationUser1.id',
                'conversationUser1.isGroupd'
            ])
            .where('conversation1.isGroup = :isGroup', { isGroup: false })
            .andWhere('conversationUser2.userId = :userId', { userId })
            .getMany();

        const conversationUser2 = await this.conversationUserRepository
            .createQueryBuilder('conversationUser2')
            .innerJoinAndSelect('conversationUser2.user', 'user')
            .select([
                'conversationUser2.id',
                'conversationUser2.isGroupd'
            ])
            .where('conversationUser2.isGroup = :isGroup', { isGroup: false })
            .andWhere('conversationUser2.userId = :userId', { userId: friendId })
            .getMany();

        //check if is existed
        for (let conv1 of conversationUser1) {
            for (let conv2 of conversationUser2) {
                if (conv1.id === conv2.id) return conv1.id;
            }
        }
        return null;
    }

    public async createSingleConversation(userId: string, friendId: string) {
        const conversationId = await this.findConversationBetweenUsers(userId, friendId);

        if (!conversationId) {
            const user = await this.userService.findUserById(userId)
            const friend = await this.userService.findUserById(friendId)
            const conversation = this.conversationRepository.create({
                name: `${userId}-${friendId}`,
            })

            await this.conversationRepository.save(conversation);
            const conversationUser1 = this.conversationUserRepository.create({
                conversation: conversation,
                user
            })
            const conversationUser2 = this.conversationUserRepository.create({
                conversation: conversation,
                user: friend
            })
            await this.conversationUserRepository.save(conversationUser1)
            await this.conversationUserRepository.save(conversationUser2)
            return conversation.id;
        }
    }


    public async findSocketIdsFromConversationId(conversationId: string) {
        console.log(conversationId)
        const conversations = await this.conversationRepository
            .createQueryBuilder('conversation')
            .innerJoinAndSelect(
                "conversation.conversationUsers",
                'ConversationUser'
            )
            .innerJoinAndSelect(
                'ConversationUser.user',
                'user'
            )
            .select([
                'conversation.id',
                'ConversationUser.id',
                'user.socketId',
                'user.id',
            ])
            .where('conversation.id = :conversationId', { conversationId })
            .getMany();
        
        const socketIds = []
        for (const conv of conversations){
            for(const convUser of conv.conversationUsers){
                if (convUser.user.socketId)
                    socketIds.push(convUser.user.socketId)
            }
        }
        return socketIds
    }

    public updateLastMessage (conversationId: string, lastMessage:string){
        this.conversationRepository.update({
            id: conversationId
        }, {lastMessage})
    }

}
