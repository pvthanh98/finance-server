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
const conversation_1 = require("../../entities/conversation");
const conversation_user_1 = require("../../entities/conversation-user");
const friend_entity_1 = require("../../entities/friend.entity");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const format_pagination_1 = require("../utils/format-pagination");
const bcrypt = require('bcryptjs');
let UserService = class UserService {
    constructor(usersRepository, friendRepository, conversationRepository, conversationUserRepository) {
        this.usersRepository = usersRepository;
        this.friendRepository = friendRepository;
        this.conversationRepository = conversationRepository;
        this.conversationUserRepository = conversationUserRepository;
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
        if (friendDto.friendId.toString() === userReq.sub.toString())
            throw new common_1.BadRequestException("Cannot add friend your self");
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
        const FriendShipPair = await this.friendRepository.createQueryBuilder("friend")
            .select()
            .where("friend.userId = :userId", { userId: friendDto.friendId })
            .andWhere("friend.friendId = :friendId", { friendId: userReq.sub })
            .getOne();
        if (isFriendShipExist && FriendShipPair) {
            throw new common_1.BadRequestException("Two you have already be friends");
            return;
        }
        if (isFriendShipExist) {
            throw new common_1.BadRequestException("Send request already!");
            return;
        }
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
                    await this.createConversation(userReq.sub, friendShip.user.id);
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
            "user.image",
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
            "user.image",
            "user.email"
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
        const user = await this.friendRepository.find();
        return this.friendRepository.remove(user);
        return this.friendRepository.find();
    }
    async createConversation(userId, friendId) {
        console.log("CHECKOUT POINT 6");
        const conversationExistId = await this.findConversationBetweenUsers(userId, friendId);
        console.log("CHECKOUT POINT 11");
        if (!conversationExistId) {
            console.log("CHECKOUT POINT 12");
            const conversationId = await this.createSingleConversation(userId, friendId);
            return conversationId;
        }
        return conversationExistId;
    }
    async findUserById(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId }
        });
        return user;
    }
    async findConversationBetweenUsers(userId, friendId) {
        const conversationUser1 = await this.conversationUserRepository
            .createQueryBuilder('conversationUser1')
            .innerJoinAndSelect('conversationUser1.user', 'user')
            .select([
            'conversationUser1.id',
            'user.id',
            'conversationUser1.conversationId'
        ])
            .where('user.id = :userId', { userId })
            .getMany();
        const conversationUser2 = await this.conversationUserRepository
            .createQueryBuilder('conversationUser2')
            .innerJoinAndSelect('conversationUser2.user', 'user')
            .select([
            'conversationUser2.id',
            'conversationUser2.conversationId',
            'user.id'
        ])
            .where('user.id = :userId', { userId: friendId })
            .getMany();
        for (let conv1 of conversationUser1) {
            for (let conv2 of conversationUser2) {
                if (conv1.conversationId === conv2.conversationId) {
                    return conv1.id;
                }
            }
        }
        return null;
    }
    async createSingleConversation(userId, friendId) {
        const conversationId = await this.findConversationBetweenUsers(userId, friendId);
        console.log("CHECKOUT POINT 13");
        if (!conversationId) {
            console.log("CHECKOUT POINT 14");
            const user = await this.usersRepository.findOne({
                where: { id: userId }
            });
            console.log("CHECKOUT POINT 15");
            const friend = await this.usersRepository.findOne({
                where: { id: friendId }
            });
            const conversation = this.conversationRepository.create({
                name: `${userId}-${friendId}`,
            });
            console.log("CHECKOUT POINT 16");
            await this.conversationRepository.save(conversation);
            const conversationUser1 = this.conversationUserRepository.create({
                conversation: conversation,
                user
            });
            console.log("CHECKOUT POINT 17");
            const conversationUser2 = this.conversationUserRepository.create({
                conversation: conversation,
                user: friend
            });
            console.log("CHECKOUT POINT 18");
            await this.conversationUserRepository.save(conversationUser1);
            await this.conversationUserRepository.save(conversationUser2);
            console.log("CHECKOUT POINT 19");
            return conversation.id;
        }
    }
    async updateSocketId(userId, socketId) {
        const user = await this.usersRepository.update({
            id: userId
        }, {
            socketId
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(friend_entity_1.Friend)),
    __param(2, (0, typeorm_1.InjectRepository)(conversation_1.Conversation)),
    __param(3, (0, typeorm_1.InjectRepository)(conversation_user_1.ConversationUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map