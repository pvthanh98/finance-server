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
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("./modules/shared_modules/log.service");
const schedule_1 = require("@nestjs/schedule");
const email_service_1 = require("./modules/shared_modules/email.service");
const google_sheet_service_1 = require("./modules/shared_modules/google_sheet.service");
const date_utils_1 = require("./utils/date.utils");
let TasksService = TasksService_1 = class TasksService {
    constructor(logService, emailService, ggSheetService) {
        this.logService = logService;
        this.emailService = emailService;
        this.ggSheetService = ggSheetService;
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    async handleCron() {
        const expenses = await this.ggSheetService.getDailyExpense();
        this.emailService.sendEmail({
            subject: 'Expense Overview',
            title: `Hi Thanh!`,
            body: `It's time to review your expenses, let's have a look in what you spend in the day!`,
            to: 'pvthanh98it@gmail.com',
            expenses: expenses.map(expense => (Object.assign(Object.assign({}, expense), { date: (0, date_utils_1.formatDate)(expense.date) })))
        });
    }
};
__decorate([
    (0, schedule_1.Cron)('*/10 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "handleCron", null);
TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_service_1.LogService,
        email_service_1.EmailService,
        google_sheet_service_1.GoogleSheetService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map