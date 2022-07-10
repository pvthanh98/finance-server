import { BadRequestException, Injectable } from '@nestjs/common';
import { random } from '../../utils/random.util';
import { SignUrlDto } from './upload.dto';
const AWS = require('aws-sdk');

@Injectable()
export class UploadService {
    private s3;
    constructor(){
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

    private uploadS3(buffer, extension) {
        return new Promise(function (resolve, reject) {
            const s3 = new AWS.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            });
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${random(48)}.${extension}`,
                Body: buffer
            }
            s3.upload(params, (err, data) => {
                if (err) return reject(err);
                return resolve(data)
            })
        })
    }

    public async upload(file:any){
        const splitName = file.originalname.split('.');
        if (splitName.length !== 2) throw new BadRequestException({ message: 'Unknow extension file' })
        const extension = splitName[1];
        try {
            const response: any = await this.uploadS3(file.buffer, extension);
            return {
                url: response.Location
            };
        } catch (e) {
            throw new BadRequestException({ message: e.message })
        }
    }

    async signedUrl (dto: SignUrlDto) {
        try{
            const signedUrl = this.s3.getSignedUrl("getObject", {
                Key: dto.key,
                Bucket: process.env.AWS_BUCKET_NAME,
                Expires: Number(process.env.AWS_SIGNED_URL_EXPIRED_IN_SECOND) , // S3 default is 900 seconds (15 minutes)
            });
            return signedUrl;
        } catch(e){
            throw new BadRequestException({message:e.message})
        }
    }
}
