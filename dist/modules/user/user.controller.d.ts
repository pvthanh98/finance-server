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
    getProfile(req: any): Promise<import("../../entities/user.entity").User>;
    updateProfile(updateProfileDto: UpdateProfileDto, req: any): Promise<import("../../entities/user.entity").User>;
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
