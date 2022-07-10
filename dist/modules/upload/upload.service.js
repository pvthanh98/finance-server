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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const random_util_1 = require("../../utils/random.util");
const AWS = require('aws-sdk');
let UploadService = class UploadService {
    constructor() {
        AWS.config = new AWS.Config({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
            signatureVersion: "v4",
        });
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
    }
    uploadS3(buffer, extension) {
        return new Promise(function (resolve, reject) {
            const s3 = new AWS.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            });
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${(0, random_util_1.random)(48)}.${extension}`,
                Body: buffer
            };
            s3.upload(params, (err, data) => {
                if (err)
                    return reject(err);
                return resolve(data);
            });
        });
    }
    async upload(file) {
        const splitName = file.originalname.split('.');
        if (splitName.length !== 2)
            throw new common_1.BadRequestException({ message: 'Unknow extension file' });
        const extension = splitName[1];
        try {
            const response = await this.uploadS3(file.buffer, extension);
            return {
                key: response.key
            };
        }
        catch (e) {
            throw new common_1.BadRequestException({ message: e.message });
        }
    }
    async signedUrl(dto) {
        try {
            const signedUrl = this.s3.getSignedUrl("getObject", {
                Key: dto.key,
                Bucket: process.env.AWS_BUCKET_NAME,
                Expires: Number(process.env.AWS_SIGNED_URL_EXPIRED_IN_SECOND),
            });
            return signedUrl;
        }
        catch (e) {
            throw new common_1.BadRequestException({ message: e.message });
        }
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map