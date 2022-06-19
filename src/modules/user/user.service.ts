import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequestAction, FriendStatus } from 'src/constants/friend.constant';
import { Friend } from 'src/entities/friend.entity';
import { User } from 'src/entities/user.entity';
import { PaginationQueryType } from 'src/types/common.type';
import { Repository } from 'typeorm';
import { FormatPaginationQuery, formatPaginationResponse } from '../utils/format-pagination';
import { UnAndAddFriendDto } from './dto/add-friend.dto';
import { HandleFriendRequestDto } from './dto/handle-friend.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserDto } from './dto/user.register';
import { UserRegisterResponse } from './type/user-register.response';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Friend)
        private friendRepository: Repository<Friend>,
    ) { }

    async getProfile(userId:string){
        const userProifle = await this.usersRepository.findOne({
            where:{
                id:userId
            }
        });
        return userProifle;
    }
 
    async updateProfile(updateProfileDto: UpdateProfileDto, userId: string){
        await this.usersRepository.update({id: userId},{
                ...updateProfileDto
        });

        const user = await this.usersRepository.findOne({
            where:{
                id: userId
            }
        });
        return user;
    }

    async registerUser(userDto: CreateUserDto): Promise<UserRegisterResponse> {
        const salt = bcrypt.genSaltSync(9);
        const password = bcrypt.hashSync(`${userDto.password}`, salt);
        const user = await this.usersRepository.create({
            ...userDto,
            password
        });
        await this.usersRepository.save(user);
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        };
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({
            where: {
                email: email
            },
            select:{
                password:true,
                id:true,
                isAdmin:true,
                email:true
            }
        });
        return user;
    }

    async findAll() {
        const users = await this.usersRepository.find({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                createdAt: true
            },
            take: 8,
            order: {
                createdAt: "DESC"
            },
        });
        return users;
    }

    async addFriend(friendDto: UnAndAddFriendDto, userReq: any) {
        const user = await this.usersRepository.findOne({
            where: { id: userReq.sub }
        })
        const friend = await this.usersRepository.findOne({
            where: { id: friendDto.friendId }
        })
        const friendShip = this.friendRepository.create({
            friend,
            user
        });

        await this.friendRepository.save(friendShip);
        return {
            status: true
        }
    }

    async handleFriendRequest(handleFriendDto: HandleFriendRequestDto, userReq: any) {
        const { friendShipId, action } = handleFriendDto;

        const friendShip = await this.friendRepository.createQueryBuilder('friend')
            .leftJoinAndSelect('friend.user', 'user')
            .where("friend.friendId = :friendId", { friendId: userReq.sub })
            .andWhere("friend.id = :id", { id: friendShipId })
            .andWhere("friend.status = :status", { status: FriendStatus.SEND_REQUEST })
            .getOne();

        const user = await this.usersRepository.findOne({
            where: { id: userReq.sub }
        });

        if (friendShip) {
            switch (action) {
                case FriendRequestAction.ACCEPT:
                    friendShip.status = FriendStatus.FRIEND;
                    const friendShipClone = this.friendRepository.create({
                        user,
                        friend: friendShip.user,
                        status: FriendStatus.FRIEND
                    });
                    await this.friendRepository.save(friendShipClone);
                    await this.friendRepository.save(friendShip);
                    return {
                        status: true
                    }
                case FriendRequestAction.DENIED:
                    await this.friendRepository.remove(friendShip);
                    return {
                        status: true
                    }

                default:
                    throw new BadRequestException("Action not accepted")
            }
        }
        throw new BadRequestException("Request not found");
    }

    async listFriendRequest(query: PaginationQueryType, userReq: any) {
        const queryFormat = FormatPaginationQuery(query);
        const { sub } = userReq;
        const values = await this.friendRepository.createQueryBuilder("friend")
            .leftJoinAndSelect("friend.user", "user")
            .select([
                "friend.id",
                "friend.status",
                "friend.friendId",
                "friend.createdAt",
                "friend.updatedAt",
                "user.id",
                "user.firstName",
                "user.lastName",
            ])
            .where("friend.friendId = :friendId", { friendId: sub })
            .andWhere("friend.status = :status", { status: FriendStatus.SEND_REQUEST })
            .skip(queryFormat.offset)
            .take(queryFormat.limit)
            .orderBy("friend.createdAt", "DESC")
            .getManyAndCount();

        return formatPaginationResponse(values, queryFormat);
    }

    async unFriend(friendDto: UnAndAddFriendDto, userReq: any) {
        const { friendId } = friendDto;

        const friendShip = await this.friendRepository.createQueryBuilder("friend")
            .where("friend.userId = :userId", { userId: userReq.sub })
            .andWhere("friend.friendId = :friendId", { friendId })
            .andWhere("friend.status = :status", { status: FriendStatus.FRIEND })
            .getOne();

        const friendShipPair = await this.friendRepository.createQueryBuilder("friend")
            .where("friend.userId = :userId", { userId: friendId })
            .andWhere("friend.friendId = :friendId", { friendId: userReq.sub })
            .andWhere("friend.status = :status", { status: FriendStatus.FRIEND })
            .getOne();

        if (friendShip && friendShipPair) {
            this.friendRepository.remove([
                friendShip,
                friendShipPair
            ]);
            return {
                status: true
            }
        }

        return {
            status: false
        }

    }


    async listFriend(query: PaginationQueryType, userReq: any) {
        // const haha = await this.friendRepository.find();
        // await this.friendRepository.remove(haha);
        // return "l"
        const queryFormat = FormatPaginationQuery(query);
        const { sub } = userReq;
        const values = await this.friendRepository.createQueryBuilder("friend")
            .leftJoinAndSelect("friend.friend", "user")
            .select([
                "friend.id",
                "friend.friendId",
                "friend.userId",
                "friend.createdAt",
                "friend.status",
                "user.id",
                "user.firstName",
                "user.lastName",
            ])
            .where("friend.userId = :userId", { userId: sub })
            .andWhere("friend.status = :status", { status: FriendStatus.FRIEND })
            .skip(queryFormat.offset)
            .take(queryFormat.limit)
            .orderBy("friend.createdAt", "DESC")
            .getManyAndCount();

        return formatPaginationResponse(values, queryFormat);
    }

    async execute(){
        /** testing only */
        const user = await this.usersRepository.findOne({
            where:{
                id:"8cd85043-423a-4987-b98a-e023b4ae36f3"
            }
        });
        user.image = "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/280141999_1666459857024930_4547795600855370134_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=l8QzIPeT3zwAX85m-qd&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT-ZcQ_f_ovfy6DNsU5yjt0chHOl8csrYoaQ5tggurnXJQ&oe=62B380C6"
        await this.usersRepository.save(user);
        return "ok"
    }
    

}
