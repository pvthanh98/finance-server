import { ConfigService } from '@nestjs/config';
import { CreateExpenseDto } from '../dashboard/dto/add-expense.dto';
import { EmailService } from './email.service';
export declare class GoogleSheetService {
    private configService;
    private emailService;
    private doc;
    constructor(configService: ConfigService, emailService: EmailService);
    loadOverview(): Promise<{
        usage: {
            daily: any;
            monthly: any;
            yearly: any;
        };
        income: {
            monthly: any;
            yearly: any;
        };
        remaining: {
            monthly: any;
            yearly: any;
        };
    }>;
    expenseByCategory(): Promise<{
        daily: {
            category: any;
            amount: any;
        }[];
        monthly: {
            category: any;
            amount: any;
        }[];
        yearly: {
            category: any;
            amount: any;
        }[];
    }>;
    getMonthlyLimitation(): Promise<{
        category: any;
        currentAmount: any;
        limit: any;
        remainingCost: any;
        isOverExpense: boolean;
    }[]>;
    getExpenseByMonth(): Promise<{
        month: any;
        amount: any;
    }[]>;
    getDailyExpense(): Promise<any[]>;
    addExpenseByDaily(createExpenseDto: CreateExpenseDto): Promise<boolean>;
}
