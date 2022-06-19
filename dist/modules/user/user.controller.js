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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const pagination_query_pipe_1 = require("../../pipes/pagination-query.pipe");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const add_friend_dto_1 = require("./dto/add-friend.dto");
const handle_friend_dto_1 = require("./dto/handle-friend.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers() {
        return this.userService.findAll();
    }
    getProfile(req) {
        return this.userService.getProfile(req.user.sub);
    }
    addFriend(friendDto, req) {
        return this.userService.addFriend(friendDto, req.user);
    }
    listFriend(query, req) {
        return this.userService.listFriend(query, req.user);
    }
    unFriend(friendDto, req) {
        return this.userService.unFriend(friendDto, req.user);
    }
    handleFriendRequest(friendRequestDto, req) {
        return this.userService.handleFriendRequest(friendRequestDto, req.user);
    }
    listFriendRequest(query, req) {
        return this.userService.listFriendRequest(query, req.user);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('friend'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_friend_dto_1.UnAndAddFriendDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "addFriend", null);
__decorate([
    (0, common_1.Get)('friend'),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PaginationQueryPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "listFriend", null);
__decorate([
    (0, common_1.Post)('friend/unfriend'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_friend_dto_1.UnAndAddFriendDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "unFriend", null);
__decorate([
    (0, common_1.Post)('friend-request'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [handle_friend_dto_1.HandleFriendRequestDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "handleFriendRequest", null);
__decorate([
    (0, common_1.Get)('friend-request'),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PaginationQueryPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "listFriendRequest", null);
UserController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map