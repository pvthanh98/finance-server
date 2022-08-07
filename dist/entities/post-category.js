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
exports.PostCategory = void 0;
const typeorm_1 = require("typeorm");
const post_1 = require("./post");
const post_tag_1 = require("./post-tag");
let PostCategory = class PostCategory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PostCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], PostCategory.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_tag_1.PostTag, postTags => postTags.postCategory),
    __metadata("design:type", Array)
], PostCategory.prototype, "postTags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_1.Post, posts => posts.postCategory),
    __metadata("design:type", Array)
], PostCategory.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], PostCategory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], PostCategory.prototype, "updatedAt", void 0);
PostCategory = __decorate([
    (0, typeorm_1.Entity)()
], PostCategory);
exports.PostCategory = PostCategory;
//# sourceMappingURL=post-category.js.map