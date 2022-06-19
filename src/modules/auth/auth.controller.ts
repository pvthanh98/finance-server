import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/user.register';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService){}
    @Post('user/register')
    userRegister(@Body() createUserDto: CreateUserDto){
        return this.userService.registerUser(createUserDto);
    }
}
