/// <reference types="multer" />
import { SignUrlDto } from './upload.dto';
import { UploadService } from './upload.service';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: any;
    }>;
    getObject(dto: SignUrlDto): Promise<any>;
}
