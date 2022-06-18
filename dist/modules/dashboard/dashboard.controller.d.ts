import { FoodCategoryHttp } from 'src/constants/common.constant';
import { GoogleSheetService } from '../shared_modules/google_sheet.service';
import { CreateExpenseDto } from './dto/add-expense.dto';
export declare class DashboardController {
    private googleSheetService;
    constructor(googleSheetService: GoogleSheetService);
    getOverview(): Promise<{
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
    getCategoryByFood(category: FoodCategoryHttp): Promise<{
        data: any[];
        totalCost: number;
    }>;
    monthlyLimitation(): Promise<{
        category: any;
        currentAmount: any;
        limit: any;
        remainingCost: any;
        isOverExpense: boolean;
    }[]>;
    expenseByMonth(): Promise<{
        month: any;
        amount: any;
    }[]>;
    expenseByDaily(): Promise<any[]>;
    addExpenseByDaily(createExpenseDto: CreateExpenseDto): Promise<boolean>;
}
