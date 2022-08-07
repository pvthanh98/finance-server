"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostTagModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_tag_1 = require("../../../entities/post-tag");
const category_module_1 = require("../category/category.module");
const post_tag_controller_1 = require("./post_tag.controller");
const post_tag_service_1 = require("./post_tag.service");
let PostTagModule = class PostTagModule {
};
PostTagModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([post_tag_1.PostTag]), category_module_1.CategoryModule],
        controllers: [post_tag_controller_1.PostTagController],
        providers: [post_tag_service_1.PostTagService]
    })
], PostTagModule);
exports.PostTagModule = PostTagModule;
//# sourceMappingURL=post_tag.module.js.map