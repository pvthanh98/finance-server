"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const friend_constant_1 = require("../../constants/friend.constant");
const friend_entity_1 = require("../../entities/friend.entity");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const format_pagination_1 = require("../utils/format-pagination");
const bcrypt = require('bcryptjs');
let UserService = class UserService {
    constructor(usersRepository, friendRepository) {
        this.usersRepository = usersRepository;
        this.friendRepository = friendRepository;
    }
    async getProfile(userId) {
        const userProifle = await this.usersRepository.findOne({
            where: {
                id: userId
            }
        });
        return userProifle;
    }
    async updateProfile(updateProfileDto, userId) {
        await this.usersRepository.update({ id: userId }, Object.assign({}, updateProfileDto));
        const user = await this.usersRepository.findOne({
            where: {
                id: userId
            }
        });
        return user;
    }
    async registerUser(userDto) {
        const salt = bcrypt.genSaltSync(9);
        const password = bcrypt.hashSync(`${userDto.password}`, salt);
        const user = await this.usersRepository.create(Object.assign(Object.assign({}, userDto), { password }));
        await this.usersRepository.save(user);
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        };
    }
    async findByEmail(email) {
        const user = await this.usersRepository.findOne({
            where: {
                email: email
            },
            select: {
                password: true,
                id: true,
                isAdmin: true,
                email: true
            }
        });
        return user;
    }
    async findAll(query) {
        const { search } = query;
        const formatQuery = (0, format_pagination_1.FormatPaginationQuery)(query);
        let users = this.usersRepository.createQueryBuilder("user")
            .select(["user.id", "user.firstName", "user.lastName", "user.email", "user.image", "user.createdAt"])
            .skip()
            .limit();
        if (search) {
            users
                .where("LOWER(user.firstName) = LOWER(:search)", { search })
                .orWhere("LOWER(user.lastName) = LOWER(:search)", { search });
        }
        let resulst = await users.getManyAndCount();
        return (0, format_pagination_1.formatPaginationResponse)(resulst, formatQuery);
    }
    async addFriend(friendDto, userReq) {
        const user = await this.usersRepository.findOne({
            where: { id: userReq.sub }
        });
        const friend = await this.usersRepository.findOne({
            where: { id: friendDto.friendId }
        });
        const isFriendShipExist = await this.friendRepository.createQueryBuilder("friend")
            .select()
            .where("friend.userId = :userId", { userId: userReq.sub })
            .andWhere("friend.friendId = :friendId", { friendId: friendDto.friendId })
            .getOne();
        if (!isFriendShipExist) {
            const friendShip = this.friendRepository.create({
                friend,
                user
            });
            await this.friendRepository.save(friendShip);
            return {
                status: true
            };
        }
        throw new common_1.BadRequestException("Two you have already be friends");
    }
    async handleFriendRequest(handleFriendDto, userReq) {
        const { friendShipId, action } = handleFriendDto;
        const friendShip = await this.friendRepository.createQueryBuilder('friend')
            .leftJoinAndSelect('friend.user', 'user')
            .where("friend.friendId = :friendId", { friendId: userReq.sub })
            .andWhere("friend.id = :id", { id: friendShipId })
            .andWhere("friend.status = :status", { status: friend_constant_1.FriendStatus.SEND_REQUEST })
            .getOne();
        const user = await this.usersRepository.findOne({
            where: { id: userReq.sub }
        });
        if (friendShip) {
            switch (action) {
                case friend_constant_1.FriendRequestAction.ACCEPT:
                    friendShip.status = friend_constant_1.FriendStatus.FRIEND;
                    const friendShipClone = this.friendRepository.create({
                        user,
                        friend: friendShip.user,
                        status: friend_constant_1.FriendStatus.FRIEND
                    });
                    await this.friendRepository.save(friendShipClone);
                    await this.friendRepository.save(friendShip);
                    return {
                        status: true
                    };
                case friend_constant_1.FriendRequestAction.DENIED:
                    await this.friendRepository.remove(friendShip);
                    return {
                        status: true
                    };
                default:
                    throw new common_1.BadRequestException("Action not accepted");
            }
        }
        throw new common_1.BadRequestException("Request not found");
    }
    async listFriendRequest(query, userReq) {
        const queryFormat = (0, format_pagination_1.FormatPaginationQuery)(query);
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
            .andWhere("friend.status = :status", { status: friend_constant_1.FriendStatus.SEND_REQUEST })
            .skip(queryFormat.offset)
            .take(queryFormat.limit)
            .orderBy("friend.createdAt", "DESC")
            .getManyAndCount();
        return (0, format_pagination_1.formatPaginationResponse)(values, queryFormat);
    }
    async unFriend(friendDto, userReq) {
        const { friendId } = friendDto;
        const friendShip = await this.friendRepository.createQueryBuilder("friend")
            .where("friend.userId = :userId", { userId: userReq.sub })
            .andWhere("friend.friendId = :friendId", { friendId })
            .andWhere("friend.status = :status", { status: friend_constant_1.FriendStatus.FRIEND })
            .getOne();
        const friendShipPair = await this.friendRepository.createQueryBuilder("friend")
            .where("friend.userId = :userId", { userId: friendId })
            .andWhere("friend.friendId = :friendId", { friendId: userReq.sub })
            .andWhere("friend.status = :status", { status: friend_constant_1.FriendStatus.FRIEND })
            .getOne();
        if (friendShip && friendShipPair) {
            this.friendRepository.remove([
                friendShip,
                friendShipPair
            ]);
            return {
                status: true
            };
        }
        return {
            status: false
        };
    }
    async listFriend(query, userReq) {
        const queryFormat = (0, format_pagination_1.FormatPaginationQuery)(query);
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
            "user.image"
        ])
            .where("friend.userId = :userId", { userId: sub })
            .andWhere("friend.status = :status", { status: friend_constant_1.FriendStatus.FRIEND })
            .skip(queryFormat.offset)
            .take(queryFormat.limit)
            .orderBy("friend.createdAt", "DESC")
            .getManyAndCount();
        return (0, format_pagination_1.formatPaginationResponse)(values, queryFormat);
    }
    async execute() {
        const user = await this.usersRepository.findOne({
            where: {
                id: "a02b7954-8a89-4b5e-9cb9-e7bac65fa1f7"
            }
        });
        user.image = "https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/143481419_420758502468395_981169606916709299_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=174925&_nc_ohc=QC5MgchnbycAX98ygJL&_nc_ht=scontent.fsgn5-8.fna&oh=00_AT_Y1AOqxr8mtFKTrx9s61fFLiCLE8KHWb3PHa26PLujJQ&oe=62D61441";
        await this.usersRepository.save(user);
        return "ok";
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(friend_entity_1.Friend)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map