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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const google_sheet_service_1 = require("../shared_modules/google_sheet.service");
const add_expense_dto_1 = require("./dto/add-expense.dto");
let DashboardController = class DashboardController {
    constructor(googleSheetService) {
        this.googleSheetService = googleSheetService;
    }
    getOverview() {
        return this.googleSheetService.loadOverview();
    }
    expenseByCategory() {
        return this.googleSheetService.expenseByCategory();
    }
    monthlyLimitation() {
        return this.googleSheetService.getMonthlyLimitation();
    }
    expenseByMonth() {
        return this.googleSheetService.getExpenseByMonth();
    }
    expenseByDaily() {
        return this.googleSheetService.getDailyExpense();
    }
    addExpenseByDaily(createExpenseDto) {
        return this.googleSheetService.addExpenseByDaily(createExpenseDto);
    }
};
__decorate([
    (0, common_1.Get)('overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)('expense-by-category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "expenseByCategory", null);
__decorate([
    (0, common_1.Get)('monthly-limitation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "monthlyLimitation", null);
__decorate([
    (0, common_1.Get)('expense-by-month'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "expenseByMonth", null);
__decorate([
    (0, common_1.Get)('expense-daily'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "expenseByDaily", null);
__decorate([
    (0, common_1.Post)('expense-daily'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_expense_dto_1.CreateExpenseDto]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "addExpenseByDaily", null);
DashboardController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [google_sheet_service_1.GoogleSheetService])
], DashboardController);
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map