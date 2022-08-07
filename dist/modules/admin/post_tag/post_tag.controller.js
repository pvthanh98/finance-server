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
exports.PostTagController = void 0;
const common_1 = require("@nestjs/common");
const pagination_query_pipe_1 = require("../../../pipes/pagination-query.pipe");
const create_tag_dto_1 = require("./dto/create-tag.dto");
const update_tag_dto_1 = require("./dto/update-tag.dto");
const post_tag_service_1 = require("./post_tag.service");
let PostTagController = class PostTagController {
    constructor(postTagService) {
        this.postTagService = postTagService;
    }
    getPostTag(query) {
        return this.postTagService.findTag(query);
    }
    getPostTagDetail(id) {
        return this.postTagService.findTagDetail(id);
    }
    createPostTag(categoryDto) {
        return this.postTagService.createTag(categoryDto);
    }
    updatePostTag(id, categoryDto) {
        return this.postTagService.updateTag(id, categoryDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PaginationQueryPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostTagController.prototype, "getPostTag", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostTagController.prototype, "getPostTagDetail", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tag_dto_1.CreatePostTagDto]),
    __metadata("design:returntype", void 0)
], PostTagController.prototype, "createPostTag", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tag_dto_1.UpdatePostTagDto]),
    __metadata("design:returntype", void 0)
], PostTagController.prototype, "updatePostTag", null);
PostTagController = __decorate([
    (0, common_1.Controller)('admin/post-tag'),
    __metadata("design:paramtypes", [post_tag_service_1.PostTagService])
], PostTagController);
exports.PostTagController = PostTagController;
//# sourceMappingURL=post_tag.controller.js.map