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
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_constant_1 = require("../../constants/common.constant");
const log_entity_1 = require("../../entities/log.entity");
const typeorm_2 = require("typeorm");
const format_pagination_1 = require("../utils/format-pagination");
let LogService = class LogService {
    constructor(logRepo) {
        this.logRepo = logRepo;
    }
    async log(logData) {
        const { message = "", from = common_constant_1.LogFrom.GUEST, type = common_constant_1.LogType.UNKNOW } = logData;
        const logContent = await this.logRepo.create({
            message,
            type,
            from
        });
        await this.logRepo.save(logContent);
        var d = new Date();
        d.setDate(d.getDate() - 7);
        this.logRepo.delete({
            createdAt: (0, typeorm_2.LessThan)(d.toISOString()),
            type: common_constant_1.LogType.PING
        });
        return logContent.message;
    }
    async getLogs(query) {
        const queryFormat = (0, format_pagination_1.FormatPaginationQuery)(query);
        console.log(queryFormat);
        const results = await this.logRepo.findAndCount({
            order: {
                updatedAt: "DESC",
            },
            take: queryFormat.limit,
            skip: queryFormat.offset
        });
        return (0, format_pagination_1.formatPaginationResponse)(results, queryFormat);
    }
};
LogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(log_entity_1.Log)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map