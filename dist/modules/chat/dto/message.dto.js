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
exports.PrivateSocketMessageDto = exports.PublicMessageDto = void 0;
const class_validator_1 = require("class-validator");
const message_enum_1 = require("../../../constants/message-enum");
class PublicMessageDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublicMessageDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PublicMessageDto.prototype, "guestName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PublicMessageDto.prototype, "guestId", void 0);
__decorate([
    (0, class_validator_1.IsIn)([
        message_enum_1.MessageTypeEnum.IMAGE,
        message_enum_1.MessageTypeEnum.TEXT,
        message_enum_1.MessageTypeEnum.VIDEO,
    ]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PublicMessageDto.prototype, "type", void 0);
exports.PublicMessageDto = PublicMessageDto;
class PrivateSocketMessageDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrivateSocketMessageDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsIn)([
        message_enum_1.MessageTypeEnum.IMAGE,
        message_enum_1.MessageTypeEnum.TEXT,
        message_enum_1.MessageTypeEnum.VIDEO,
    ]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PrivateSocketMessageDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrivateSocketMessageDto.prototype, "fromUserId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrivateSocketMessageDto.prototype, "conversationId", void 0);
exports.PrivateSocketMessageDto = PrivateSocketMessageDto;
//# sourceMappingURL=message.dto.js.map