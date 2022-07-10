import { SignUrlDto } from '../upload/upload.dto';
export declare class S3Service {
    private s3;
    constructor();
    private uploadS3;
    upload(file: any): Promise<{
        key: any;
    }>;
    signedUrl(dto: SignUrlDto): Promise<any>;
}
