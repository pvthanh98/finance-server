import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleSheetService } from '../shared_modules/google_sheet.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private googleSheetService: GoogleSheetService){}
    
    @Get('overview')
    getOverview(){
        return this.googleSheetService.loadOverview()
    }

    @Get('expense-by-category')
    expenseByCategory(){
        return this.googleSheetService.expenseByCategory();
    }

    @Get('monthly-limitation')
    monthlyLimitation(){
        return this.googleSheetService.getMonthlyLimitation();
    }

    @Get('expense-by-month')
    expenseByMonth(){
        return this.googleSheetService.getExpenseByMonth();
    }

    @Get('expense-daily')
    expenseByDaily(){
        return this.googleSheetService.getDailyExpense();
    }

}
