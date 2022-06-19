import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { PaginationQueryPipe } from 'src/pipes/pagination-query.pipe';
import { PaginationQueryType } from 'src/types/common.type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UnAndAddFriendDto } from './dto/add-friend.dto';
import { HandleFriendRequestDto } from './dto/handle-friend.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}
    
    @Get()
    getUsers(){
        return this.userService.findAll();
    }

    @Get('profile')
    getProfile(@Req() req){
        return this.userService.getProfile(req.user.sub);
    }

    @Put('profile')
    updateProfile(@Body() updateProfileDto: UpdateProfileDto ,@Req() req){
        return this.userService.updateProfile(updateProfileDto, req.user.sub);
    }

    @Post('friend')
    addFriend(@Body() friendDto: UnAndAddFriendDto, @Req() req){
        return this.userService.addFriend(friendDto, req.user);
    }

    @Get('friend')
    listFriend(@Query(PaginationQueryPipe) query: PaginationQueryType ,@Req() req){
        return this.userService.listFriend(query, req.user);
    }

    @Post('friend/unfriend')
    unFriend(@Body() friendDto: UnAndAddFriendDto, @Req() req){
        return this.userService.unFriend(friendDto, req.user);
    }

    @Post('friend-request')
    handleFriendRequest(@Body() friendRequestDto: HandleFriendRequestDto, @Req() req){
        return this.userService.handleFriendRequest(friendRequestDto, req.user);
    }

    @Get('friend-request')
    listFriendRequest(@Query(PaginationQueryPipe) query: PaginationQueryType ,@Req() req){
        return this.userService.listFriendRequest(query, req.user);
    }
}
