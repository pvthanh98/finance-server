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
exports.CommonController = void 0;
const common_1 = require("@nestjs/common");
const common_constant_1 = require("../../constants/common.constant");
const common_service_1 = require("./common.service");
let CommonController = class CommonController {
    constructor(commonService) {
        this.commonService = commonService;
    }
    pingServer(req) {
        const logData = {
            message: req.query.message ? `${req.query.message}` : "Ping",
            from: req.query.from ? `${req.query.from}` : common_constant_1.LogFrom.GUEST,
            type: req.query.type ? `${req.query.type}` : common_constant_1.LogType.PING
        };
        return this.commonService.log(logData);
    }
    getLog() {
        return this.commonService.getLogs();
    }
};
__decorate([
    (0, common_1.Get)('ping'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommonController.prototype, "pingServer", null);
__decorate([
    (0, common_1.Get)('log'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommonController.prototype, "getLog", null);
CommonController = __decorate([
    (0, common_1.Controller)('common'),
    __metadata("design:paramtypes", [common_service_1.CommonService])
], CommonController);
exports.CommonController = CommonController;
//# sourceMappingURL=common.controller.js.map