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
exports.PostTag = void 0;
const typeorm_1 = require("typeorm");
const post_category_1 = require("./post-category");
let PostTag = class PostTag {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PostTag.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], PostTag.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], PostTag.prototype, "postCategoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_category_1.PostCategory, postCategory => postCategory.postTags),
    (0, typeorm_1.JoinColumn)({ name: 'postCategoryId' }),
    __metadata("design:type", post_category_1.PostCategory)
], PostTag.prototype, "postCategory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], PostTag.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], PostTag.prototype, "updatedAt", void 0);
PostTag = __decorate([
    (0, typeorm_1.Entity)()
], PostTag);
exports.PostTag = PostTag;
//# sourceMappingURL=post-tag.js.map