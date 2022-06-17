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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const email_template_1 = require("./email-templates/email-template");
const sgMail = require('@sendgrid/mail');
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        sgMail.setApiKey(this.configService.get("SENDGIRD_API_KEY"));
    }
    async sendExpenseAddedMail(message) {
        const msg = {
            to: message.to,
            from: 'TP Site<thanhphan.gg@gmail.com>',
            subject: message.subject,
            text: message.body,
            html: (0, email_template_1.emailTemplate)(message.title, message.body, message.expenses),
        };
        sgMail
            .send(msg)
            .then(() => {
            console.log('Email sent');
        })
            .catch((error) => {
            console.error(error);
        });
        return {
            status: true
        };
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map