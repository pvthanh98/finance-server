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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("../chat/chat.service");
const log_service_1 = require("../shared_modules/log.service");
const user_service_1 = require("../user/user.service");
let CommonService = class CommonService {
    constructor(logService, userService, chatService) {
        this.logService = logService;
        this.userService = userService;
        this.chatService = chatService;
    }
    log(logData) {
        return this.logService.log(logData);
    }
    async getLogs(query) {
        return this.logService.getLogs(query);
    }
    async execute() {
        return this.userService.execute();
    }
    async getPublicMessages(query) {
        return this.chatService.getPublicMessage(query);
    }
};
CommonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_service_1.LogService,
        user_service_1.UserService,
        chat_service_1.ChatService])
], CommonService);
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map