import { PaginationQueryType } from 'src/types/common.type';
import { UnAndAddFriendDto } from './dto/add-friend.dto';
import { HandleFriendRequestDto } from './dto/handle-friend.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(query: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
    getProfile(req: any): Promise<{
        image: any;
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        isActive: boolean;
        isAdmin: boolean;
        password: string;
        friends: import("../../entities/friend.entity").Friend[];
        conversationUsers: import("../../entities/conversation-user").ConversationUser[];
        messages: import("../../entities/message").Message[];
        auth: import("../../entities/auth.entity").Auth[];
        socketId: string;
        createdAt: string;
        updatedAt: string;
    }>;
    updateProfile(updateProfileDto: UpdateProfileDto, req: any): Promise<{
        image: any;
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        isActive: boolean;
        isAdmin: boolean;
        password: string;
        friends: import("../../entities/friend.entity").Friend[];
        conversationUsers: import("../../entities/conversation-user").ConversationUser[];
        messages: import("../../entities/message").Message[];
        auth: import("../../entities/auth.entity").Auth[];
        socketId: string;
        createdAt: string;
        updatedAt: string;
    }>;
    addFriend(friendDto: UnAndAddFriendDto, req: any): Promise<{
        status: boolean;
    }>;
    listFriend(query: PaginationQueryType, req: any): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
    unFriend(friendDto: UnAndAddFriendDto, req: any): Promise<{
        status: boolean;
    }>;
    handleFriendRequest(friendRequestDto: HandleFriendRequestDto, req: any): Promise<{
        status: boolean;
    }>;
    listFriendRequest(query: PaginationQueryType, req: any): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
}
