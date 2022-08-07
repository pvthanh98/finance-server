import { ForgotPasswordDto } from '../user/dto/forgotpassword.dto';
import { ResetPasswordDto } from '../user/dto/reset.dto';
import { CreateUserDto } from '../user/dto/user.register';
import { UserService } from '../user/user.service';
export declare class AuthController {
    private userService;
    constructor(userService: UserService);
    userRegister(createUserDto: CreateUserDto): Promise<import("../user/type/user-register.response").UserRegisterResponse>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        status: boolean;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        status: boolean;
    }>;
}
