import { Injectable, Logger } from '@nestjs/common';
import { LogService } from './modules/shared_modules/log.service';
import { Cron } from '@nestjs/schedule';
import { EmailService } from './modules/shared_modules/email.service';
import { DashboardService } from './modules/dashboard/dashboard.service';
import { GoogleSheetService } from './modules/shared_modules/google_sheet.service';
import moment from 'moment';
import { formatDate } from './utils/date.utils';

@Injectable()
export class TasksService {
    constructor(
        private logService: LogService,
        private emailService: EmailService,
        private ggSheetService: GoogleSheetService
    ) { }
    private readonly logger = new Logger(TasksService.name);

    @Cron('0 15 * * *')
    async handleCron() {
        const expenses = await this.ggSheetService.getDailyExpense();
        this.emailService.sendEmail({
            subject: 'Expense Overview',
            title: `Hi Thanh!`,
            body: `It's time to review your expenses, let's have a look in what you spend in the day!`,
            to: 'pvthanh98it@gmail.com',
            expenses: expenses.map(expense => ({
                ...expense,
                date: formatDate(expense.date)
            }))
        })
    }
}