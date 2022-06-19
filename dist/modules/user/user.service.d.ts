import { Friend } from 'src/entities/friend.entity';
import { User } from 'src/entities/user.entity';
import { PaginationQueryType } from 'src/types/common.type';
import { Repository } from 'typeorm';
import { UnAndAddFriendDto } from './dto/add-friend.dto';
import { HandleFriendRequestDto } from './dto/handle-friend.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserDto } from './dto/user.register';
import { UserRegisterResponse } from './type/user-register.response';
export declare class UserService {
    private usersRepository;
    private friendRepository;
    constructor(usersRepository: Repository<User>, friendRepository: Repository<Friend>);
    getProfile(userId: string): Promise<User>;
    updateProfile(updateProfileDto: UpdateProfileDto, userId: string): Promise<User>;
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
    execute(): Promise<string>;
}
