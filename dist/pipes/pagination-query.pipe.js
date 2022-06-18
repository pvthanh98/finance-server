"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationQueryPipe = void 0;
const common_1 = require("@nestjs/common");
const common_constant_1 = require("../constants/common.constant");
let PaginationQueryPipe = class PaginationQueryPipe {
    transform(value, metadata) {
        let limit = common_constant_1.PaginationConstant.DEFAULT_LIMIT;
        let page = common_constant_1.PaginationConstant.DEFAULT_PAGE;
        if (value.page && !isNaN(value.page)) {
            page = Number(value.page);
        }
        if (value.limit && !isNaN(value.limit)) {
            limit = Number(value.limit);
        }
        return {
            page, limit
        };
    }
};
PaginationQueryPipe = __decorate([
    (0, common_1.Injectable)()
], PaginationQueryPipe);
exports.PaginationQueryPipe = PaginationQueryPipe;
//# sourceMappingURL=pagination-query.pipe.js.map