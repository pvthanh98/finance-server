import { SignUrlDto } from './upload.dto';
export declare class UploadService {
    private s3;
    constructor();
    private uploadS3;
    upload(file: any): Promise<{
        url: any;
    }>;
    signedUrl(dto: SignUrlDto): Promise<any>;
}