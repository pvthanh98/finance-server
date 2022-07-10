import { BadRequestException, Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { random } from '../../utils/random.util';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SignUrlDto } from './upload.dto';
import { UploadService } from './upload.service';
const AWS = require('aws-sdk');

@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.uploadService.upload(file);
    }

    @Post('sign-url')
    async getObject(@Body() dto: SignUrlDto) {
        return this.uploadService.signedUrl(dto);
    }
}
