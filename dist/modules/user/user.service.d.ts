import { Auth } from 'src/entities/auth.entity';
import { Conversation } from 'src/entities/conversation';
import { ConversationUser } from 'src/entities/conversation-user';
import { Friend } from 'src/entities/friend.entity';
import { User } from 'src/entities/user.entity';
import { PaginationQueryType } from 'src/types/common.type';
import { Repository } from 'typeorm';
import { EmailService } from '../shared_modules/email.service';
import { S3Service } from '../shared_modules/s3.service';
import { UnAndAddFriendDto } from './dto/add-friend.dto';
import { ForgotPasswordDto } from './dto/forgotpassword.dto';
import { HandleFriendRequestDto } from './dto/handle-friend.dto';
import { ResetPasswordDto } from './dto/reset.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserDto } from './dto/user.register';
import { UserRegisterResponse } from './type/user-register.response';
export declare class UserService {
    private usersRepository;
    private friendRepository;
    private conversationRepository;
    private conversationUserRepository;
    private authsRepository;
    private s3Service;
    private emailService;
    constructor(usersRepository: Repository<User>, friendRepository: Repository<Friend>, conversationRepository: Repository<Conversation>, conversationUserRepository: Repository<ConversationUser>, authsRepository: Repository<Auth>, s3Service: S3Service, emailService: EmailService);
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
        auth: Auth[];
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
        auth: Auth[];
        socketId: string;
        createdAt: string;
        updatedAt: string;
    }>;
    registerUser(userDto: CreateUserDto): Promise<UserRegisterResponse>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        code: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        status: boolean;
    }>;
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
