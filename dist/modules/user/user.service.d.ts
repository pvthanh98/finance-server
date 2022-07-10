import { Conversation } from 'src/entities/conversation';
import { ConversationUser } from 'src/entities/conversation-user';
import { Friend } from 'src/entities/friend.entity';
import { User } from 'src/entities/user.entity';
import { PaginationQueryType } from 'src/types/common.type';
import { Repository } from 'typeorm';
import { S3Service } from '../shared_modules/s3.service';
import { UnAndAddFriendDto } from './dto/add-friend.dto';
import { HandleFriendRequestDto } from './dto/handle-friend.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserDto } from './dto/user.register';
import { UserRegisterResponse } from './type/user-register.response';
export declare class UserService {
    private usersRepository;
    private friendRepository;
    private conversationRepository;
    private conversationUserRepository;
    private s3Service;
    constructor(usersRepository: Repository<User>, friendRepository: Repository<Friend>, conversationRepository: Repository<Conversation>, conversationUserRepository: Repository<ConversationUser>, s3Service: S3Service);
    getProfile(userId: string): Promise<{
        image: any;
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        isActive: boolean;
        isAdmin: boolean;
        password: string;
        friends: Friend[];
        conversationUsers: ConversationUser[];
        messages: import("../../entities/message").Message[];
        socketId: string;
        createdAt: string;
        updatedAt: string;
    }>;
    updateProfile(updateProfileDto: UpdateProfileDto, userId: string): Promise<{
        image: any;
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        isActive: boolean;
        isAdmin: boolean;
        password: string;
        friends: Friend[];
        conversationUsers: ConversationUser[];
        messages: import("../../entities/message").Message[];
        socketId: string;
        createdAt: string;
        updatedAt: string;
    }>;
    registerUser(userDto: CreateUserDto): Promise<UserRegisterResponse>;
    findByEmail(email: string): Promise<User>;
    findAll(query: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
    addFriend(friendDto: UnAndAddFriendDto, userReq: any): Promise<{
        status: boolean;
    }>;
    handleFriendRequest(handleFriendDto: HandleFriendRequestDto, userReq: any): Promise<{
        status: boolean;
    }>;
    listFriendRequest(query: PaginationQueryType, userReq: any): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
    unFriend(friendDto: UnAndAddFriendDto, userReq: any): Promise<{
        status: boolean;
    }>;
    listFriend(query: PaginationQueryType, userReq: any): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
    execute(): Promise<Friend[]>;
    private createConversation;
    findUserById(userId: string): Promise<User>;
    findConversationBetweenUsers(userId: string, friendId: string): Promise<string>;
    createSingleConversation(userId: string, friendId: string): Promise<string>;
    updateSocketId(userId: string, socketId: string): Promise<void>;
}
