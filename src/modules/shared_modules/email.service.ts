import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessageType, MessageTypeDto } from 'src/types/email.type';
import { dailyEmailTemplate } from './email-templates/dailly-email-template';
import { emailTemplate } from './email-templates/email-template';
import { MailTemplate } from './email-templates/mail-template';
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

    async sendEmail (message: MessageType){
        /** Only use for expense */
        const msg = {
            to: message.to,
            from: 'TP Site<thanhphan.gg@gmail.com>',
            subject: message.subject,
            text: message.body,
            html: dailyEmailTemplate(message.title ,message.body, message.expenses),
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

    async sendMail(message: MessageTypeDto){
        const msg = {
            to: message.to,
            from: 'TP Site<thanhphan.gg@gmail.com>',
            subject: message.subject,
            text: message.body,
            html: MailTemplate(message.title ,message.body),
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