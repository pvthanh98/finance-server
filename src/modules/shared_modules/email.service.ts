import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessageType } from 'src/types/email.type';
import { emailTemplate } from './email-templates/email-template';
const sgMail = require('@sendgrid/mail')

@Injectable()
export class EmailService {
    constructor(private configService: ConfigService) {
        sgMail.setApiKey(this.configService.get("SENDGIRD_API_KEY"));
    }
    async sendExpenseAddedMail(message: MessageType) {
        const msg = {
            to: message.to,
            from: 'TP Site<thanhphan.gg@gmail.com>',
            subject: message.subject,
            text: message.body,
            html: emailTemplate(message.title ,message.body, message.expenses),
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

        return {
            status: true
        }
    }
}