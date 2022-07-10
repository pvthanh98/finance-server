import { Body, Controller, Get, Post } from '@nestjs/common';
import { ForgotPasswordDto } from '../user/dto/forgotpassword.dto';
import { ResetPasswordDto } from '../user/dto/reset.dto';
import { CreateUserDto } from '../user/dto/user.register';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService){}
    @Post('user/register')
    userRegister(@Body() createUserDto: CreateUserDto){
        return this.userService.registerUser(createUserDto);
    }

    @Post('user/forgot-password')
    forgotPassword(@Body() dto: ForgotPasswordDto){
        return this.userService.forgotPassword(dto);
    }

    @Post('user/reset-password')
    resetPassword(@Body() dto: ResetPasswordDto){
        return this.userService.resetPassword(dto);
    }
}
