import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleSheetService } from '../shared_modules/google_sheet.service';
import { CreateExpenseDto } from './dto/add-expense.dto';

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

    @Post('expense-daily')
    addExpenseByDaily(@Body() createExpenseDto: CreateExpenseDto){
        return this.googleSheetService.addExpenseByDaily(createExpenseDto);
    }

}
