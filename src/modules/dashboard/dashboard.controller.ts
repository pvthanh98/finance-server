import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FoodCategoryHttp } from 'src/constants/common.constant';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GoogleSheetService } from '../shared_modules/google_sheet.service';
import { CreateExpenseDto } from './dto/add-expense.dto';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
    constructor(private googleSheetService: GoogleSheetService){}
    
    @UseGuards(AdminGuard)
    @Get('overview')
    getOverview(){
        return this.googleSheetService.loadOverview()
    }

    @UseGuards(AdminGuard)
    @Get('expense-by-category')
    expenseByCategory(){
        return this.googleSheetService.expenseByCategory();
    }

    @UseGuards(AdminGuard)
    @Get('expense-by-category-by/:category')
    getCategoryByFood(@Param('category') category: FoodCategoryHttp){
        return this.googleSheetService.getCategoryByFood(category);
    }

    @UseGuards(AdminGuard)
    @Get('monthly-limitation')
    monthlyLimitation(){
        return this.googleSheetService.getMonthlyLimitation();
    }   

    @UseGuards(AdminGuard)
    @Get('expense-by-month')
    expenseByMonth(){
        return this.googleSheetService.getExpenseByMonth();
    }

    @UseGuards(AdminGuard)
    @Get('expense-daily')
    expenseByDaily(){
        return this.googleSheetService.getDailyExpense();
    }

    @UseGuards(AdminGuard)
    @Post('expense-daily')
    addExpenseByDaily(@Body() createExpenseDto: CreateExpenseDto){
        return this.googleSheetService.addExpenseByDaily(createExpenseDto);
    }

}
