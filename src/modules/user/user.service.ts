import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequestAction, FriendStatus } from 'src/constants/friend.constant';
import { Auth } from 'src/entities/auth.entity';
import { Conversation } from 'src/entities/conversation';
import { ConversationUser } from 'src/entities/conversation-user';
import { Friend } from 'src/entities/friend.entity';
import { User } from 'src/entities/user.entity';
import { PaginationQueryType } from 'src/types/common.type';
import { random } from 'src/utils/random.util';
import { isExpired } from 'src/utils/time.util';
import { Repository } from 'typeorm';
import { EmailService } from '../shared_modules/email.service';
import { S3Service } from '../shared_modules/s3.service';
import { FormatPaginationQuery, formatPaginationResponse } from '../utils/format-pagination';
import { UnAndAddFriendDto } from './dto/add-friend.dto';
import { ForgotPasswordDto } from './dto/forgotpassword.dto';
import { HandleFriendRequestDto } from './dto/handle-friend.dto';
import { ResetPasswordDto } from './dto/reset.dto';
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
        @InjectRepository(Conversation)
        private conversationRepository: Repository<Conversation>,
        @InjectRepository(ConversationUser)
        private conversationUserRepository: Repository<ConversationUser>,
        @InjectRepository(Auth)
        private authsRepository: Repository<Auth>,
        private s3Service: S3Service,
        private emailService: EmailService
    ) { }

    async getProfile(userId: string) {
        const userProifle = await this.usersRepository.findOne({
            where: {
                id: userId
            }
        });
        return {
            ...userProifle,
            image: await this.s3Service.signedUrl({ key: userProifle.image })
        };
    }

    async updateProfile(updateProfileDto: UpdateProfileDto, userId: string) {
        await this.usersRepository.update({ id: userId }, {
            ...updateProfileDto
        });

        const user = await this.usersRepository.findOne({
            where: {
                id: userId
            }
        });
        return {
            ...user,
            image: await this.s3Service.signedUrl({ key: user.image })
        };
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


    async forgotPassword(dto: ForgotPasswordDto) {
        const user = await this.usersRepository.findOne({
            where: {
                email: dto.email
            }
        })
        const code = random(6);
        if (!user) throw new NotFoundException({ message: 'Email not found' });
        await this.authsRepository.delete({
            userId: user.id
        })
        
        const generatedCode = await this.authsRepository.create({
            code: code,
            userId: user.id
        })
        await this.authsRepository.save(generatedCode);
        this.emailService.sendMail({
            subject: 'TP Site Forgot password',
            title: 'Hi! Here is your code',
            body: `Code: ${code}`,
            to: dto.email
        })
        return {
            status: true
        };
    }


    async resetPassword(dto: ResetPasswordDto) {
        const user = await this.usersRepository.findOne({
            where: {
                email: dto.email
            }
        });
        if (!user) throw new BadRequestException({ message: 'Email not found' });
        const auth = await this.authsRepository.findOne({
            where: {
                userId: user.id
            }
        })
        if (!auth) throw new BadRequestException({ message: 'Wrong code' });
        
        if(isExpired(auth.createdAt, 30)) throw new BadRequestException({message: 'Code Expire'});

        const salt = bcrypt.genSaltSync(9);
        const password = bcrypt.hashSync(`${dto.password}`, salt);
        user.password = password;
        await this.usersRepository.save(user);
        await this.authsRepository.delete({
            userId: user.id
        })
        return {
            status: true
        };

    }

    async findByEmail(email: string) {
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

    async findAll(query: PaginationQueryType) {
        const { search } = query;
        const formatQuery = FormatPaginationQuery(query);

        let users = this.usersRepository.createQueryBuilder("user")
            .select(["user.id", "user.firstName", "user.lastName", "user.email", "user.image", "user.createdAt"])
            .skip()
            .limit()

        if (search) {
            users
                .where("LOWER(user.firstName) = LOWER(:search)", { search })
                .orWhere("LOWER(user.lastName) = LOWER(:search)", { search })
        }

        let resulst = await users.getManyAndCount();
        return formatPaginationResponse(resulst, formatQuery);
    }

    async addFriend(friendDto: UnAndAddFriendDto, userReq: any) {
        if (friendDto.friendId.toString() === userReq.sub.toString())
            throw new BadRequestException("Cannot add friend your self")
        const user = await this.usersRepository.findOne({
            where: { id: userReq.sub }
        })
        const friend = await this.usersRepository.findOne({
            where: { id: friendDto.friendId }
        })

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
            throw new BadRequestException("Two you have already be friends");
            return;
        }

        if (isFriendShipExist) {
            throw new BadRequestException("Send request already!");
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
            }
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
                    /** TODO: create conversation69 */
                    await this.createConversation(userReq.sub, friendShip.user.id);
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
                "user.image",
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
                "user.image",
                "user.email"
            ])
            .where("friend.userId = :userId", { userId: sub })
            .andWhere("friend.status = :status", { status: FriendStatus.FRIEND })
            .skip(queryFormat.offset)
            .take(queryFormat.limit)
            .orderBy("friend.createdAt", "DESC")
            .getManyAndCount();

        return formatPaginationResponse(values, queryFormat);
    }

    async execute() {
        // /** testing only */
        // const user = await this.usersRepository.findOne({
        //     where:{
        //         id:"a02b7954-8a89-4b5e-9cb9-e7bac65fa1f7"
        //     }
        // });
        // user.image = "https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/143481419_420758502468395_981169606916709299_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=174925&_nc_ohc=QC5MgchnbycAX98ygJL&_nc_ht=scontent.fsgn5-8.fna&oh=00_AT_Y1AOqxr8mtFKTrx9s61fFLiCLE8KHWb3PHa26PLujJQ&oe=62D61441"
        // await this.usersRepository.save(user);


        const user = await this.friendRepository.find();
        return this.friendRepository.remove(user)


        return this.friendRepository.find();
    }

    private async createConversation(userId: string, friendId: string) {
        console.log("CHECKOUT POINT 6")
        const conversationExistId = await this.findConversationBetweenUsers(userId, friendId);
        console.log("CHECKOUT POINT 11")
        if (!conversationExistId) {
            console.log("CHECKOUT POINT 12")
            const conversationId = await this.createSingleConversation(userId, friendId)
            return conversationId;
        }
        return conversationExistId
    }


    public async findUserById(userId: string) {
        const user = await this.usersRepository.findOne({
            where: { id: userId }
        })
        return user;
    }


    public async findConversationBetweenUsers(userId: string, friendId: string) {
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

    public async createSingleConversation(userId: string, friendId: string) {
        const conversationId = await this.findConversationBetweenUsers(userId, friendId);
        console.log("CHECKOUT POINT 13")
        if (!conversationId) {
            console.log("CHECKOUT POINT 14")
            const user = await this.usersRepository.findOne({
                where: { id: userId }
            })
            console.log("CHECKOUT POINT 15")
            const friend = await this.usersRepository.findOne({
                where: { id: friendId }
            })
            const conversation = this.conversationRepository.create({
                name: `${userId}-${friendId}`,
            })
            console.log("CHECKOUT POINT 16")

            await this.conversationRepository.save(conversation);
            const conversationUser1 = this.conversationUserRepository.create({
                conversation: conversation,
                user
            })
            console.log("CHECKOUT POINT 17")
            const conversationUser2 = this.conversationUserRepository.create({
                conversation: conversation,
                user: friend
            })
            console.log("CHECKOUT POINT 18")
            await this.conversationUserRepository.save(conversationUser1)
            await this.conversationUserRepository.save(conversationUser2)
            console.log("CHECKOUT POINT 19")
            return conversation.id;
        }
    }

    public async updateSocketId(userId: string, socketId: string) {
        const user = await this.usersRepository.update({
            id: userId
        }, {
            socketId
        })

    }


}
