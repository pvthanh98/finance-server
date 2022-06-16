import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.register';
import { UserRegisterResponse } from './type/user-register.response';
export declare class UserService {
    private usersRepository;
    private configService;
    constructor(usersRepository: Repository<User>, configService: ConfigService);
    registerUser(userDto: CreateUserDto): Promise<UserRegisterResponse>;
    findByEmail(email: string): Promise<User>;
    findAll(): Promise<User[]>;
}
