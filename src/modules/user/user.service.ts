import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.register';
import { UserRegisterResponse } from './type/user-register.response';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private configService: ConfigService
    ) { }

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

    async findByEmail(email:string) {
        const user = await this.usersRepository.findOne({
            where:{
                email: email
            }
        });
        return user;
    }

    async findAll() {
        const users = await this.usersRepository.find({
            select: {
                id:true,
                firstName:true,
                lastName:true,
                email:true,
                createdAt:true
            },
            take:8,
            order: {
                createdAt:"DESC"
            },
        });
        return users;
    }

}
