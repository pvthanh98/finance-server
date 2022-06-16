import { CreateUserDto } from '../user/dto/user.register';
import { UserService } from '../user/user.service';
export declare class AuthController {
    private userService;
    constructor(userService: UserService);
    userRegister(createUserDto: CreateUserDto): Promise<import("../user/type/user-register.response").UserRegisterResponse>;
    findAllUser(): Promise<import("../../entities/user.entity").User[]>;
}
