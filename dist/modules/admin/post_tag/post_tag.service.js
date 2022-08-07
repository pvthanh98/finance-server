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
exports.PostTagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_tag_1 = require("../../../entities/post-tag");
const format_pagination_1 = require("../../utils/format-pagination");
const typeorm_2 = require("typeorm");
const category_service_1 = require("../category/category.service");
let PostTagService = class PostTagService {
    constructor(postTagRepo, postCategoryService) {
        this.postTagRepo = postTagRepo;
        this.postCategoryService = postCategoryService;
    }
    async createTag(dto) {
        const category = await this.postCategoryService.findCategoryDetail(dto.postCategoryId);
        if (!category)
            throw new common_1.BadRequestException('Category not found');
        const tag = await this.postTagRepo.create(Object.assign({}, dto));
        await this.postTagRepo.save(tag);
        return tag;
    }
    async updateTag(id, dto) {
        if (dto.postCategoryId) {
            const category = await this.postCategoryService.findCategoryDetail(dto.postCategoryId);
            if (!category)
                throw new common_1.BadRequestException('Category not found');
        }
        await this.postTagRepo.update({ id }, Object.assign({}, dto));
        const tag = await this.postTagRepo.findOne({ where: { id } });
        return tag;
    }
    async findTag(query) {
        const formatQuery = (0, format_pagination_1.FormatPaginationQuery)(query);
        const tags = await this.postTagRepo.findAndCount({
            skip: formatQuery.offset,
            take: formatQuery.limit,
        });
        return (0, format_pagination_1.formatPaginationResponse)(tags, formatQuery);
    }
    async findTagDetail(id) {
        const tag = await this.postTagRepo.findOne({
            where: {
                id
            }
        });
        return tag;
    }
};
PostTagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_tag_1.PostTag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        category_service_1.CategoryService])
], PostTagService);
exports.PostTagService = PostTagService;
//# sourceMappingURL=post_tag.service.js.map