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
exports.GoogleSheetService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const common_constant_1 = require("../../constants/common.constant");
const sheet_constant_1 = require("../../constants/sheet.constant");
const convert_1 = require("../utils/convert");
const email_service_1 = require("./email.service");
const { GoogleSpreadsheet } = require('google-spreadsheet');
let GoogleSheetService = class GoogleSheetService {
    constructor(configService, emailService) {
        this.configService = configService;
        this.emailService = emailService;
        this.doc = new GoogleSpreadsheet(sheet_constant_1.SHEET_CONSTANTS.DASHBOARD);
        this.doc.useServiceAccountAuth({
            client_email: this.configService.get('CLIENT_EMAIL'),
            private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDOwg9HSfd81tx+\n22AzATgIK67Z3I1wEvVdYHzoSBXx9qFoS2nsER//OiVCZOKtJErrrvoeOPsmlNQ/\nA6tGvtLd2TaPJCL9Qy3I4C1hvmdHiTgrv88K0M42KSgT3bkbA5sozRQUBnZeRXKx\nQn6a18VIGkZjKEtY4/TlVoLWVKPp/GhoosoFscb1fpS9O5Ry38clG9gDqXju466L\nq3Nb37txDlJe2Sp+9GWm+3bn0+VfvZ1L4UE8LgodD2neCHvOInS6j7V3lF2xV585\n9ZnXbgM3QHanKtbAu5ZTEvgfkt2oH4qobgC1MYFmW7vPL1hA3ZrZ/PK9THzDTYgv\nh3hWhLe9AgMBAAECggEAGRpcqoYjg0e/C7Ps8SRjvjI3j4IEtifHHKg7YiRmbbNJ\nE5WcbaoCnYVcwrvm/aibZBQhkAvRCnUlc+UpJXTDu2XFBwoXKXK/m1UEjYqFlZzm\ncgFezOxfLRpAIHFaKRp9+y0zE99Y/ccmzrjJEFnEPSXbh+x7gXZj5HhleEpcgGsJ\n3K7kGZ5Y02NjF1Qo5OtMPxfi2feBSfrD7LikEzfY7rMvnysmX8SWHhyX1DkEmoW2\na3fsdbzUg8fd1za50fblAZuwh7er59Ppg5W1hlFGteGlMdPXH9XCEOVaT4/ZSCU+\nmiJDMacF5mukVpazUboZZnr/+FIEEyjhD7EC/dJ2wQKBgQD6ewBFtZ/MfDXAdAVa\nrf4BhufJPK2N477t5v9JDRqzWLq/ao09wYy/QU/8tiv6n3H2KU45Z9odknnHBXK7\ngK/NY2NJbXyLklOxtpQ9/hgkOwniVySxN3b9Hbu1Zwpi4/SZ6FmZfjDKd0I4az1L\nha42LvnTLdT38zD/t6v5jyWi0QKBgQDTUGnmQ1C7xvmrHSB4NtUO7XDmBNdUTDpH\nfxvHmw3dxR+auo2zcUj18Dc9CgYXvmMb2kVNl1nNszTngB+UNBKWFGRuPwsPbTvN\nGV0DDQL14yOYSW1sW/jmFKPC3kyL4eknqEatzhRzc/0Ug9wcWn30l0863Wwd6xLo\nAOEq+UHJLQKBgE39uon6EXWkP0BbX8dqYaqsDMPWBtwlS6/buyVN1UB+ojczwCK4\nf1CVz4gKWQtCVkOlfNvXAE0w7IYRpjXHzfWPuryEQMFcoH63MNVUpsOxNlSpeZ1M\nfdo2Rdon6U39WI4LkMqARkTkeVQD4CQBzcrFObiNjsBdkqYs1HlyHu/hAoGBANIP\nUfZwXEUOGwqavbhC6bEZH+3ISjWmQRjppjfaTwJx/mTVph8HMjwpOwAWgs//lo4N\ngG8NUVxGFQU8PCgbS46dXuipCtmfAJ914xwxRwwfazbrZzcchmRRiCkiyn0Taa7e\nfMQx4+qRFrfaDGizHBqUf1JI4j0rfXPby/noJhlRAoGAMIqM5N9v/0kbO3NMoEcT\nVaEli9NDEwPOLi1FaFElR7eIMSZkMoZWU+IJVItR0ziMBZEmWrM5I3k6bj84wLB5\n08P2UaImc/ofQK3S2Yd1Yg9VlvdxhGjHm0AqKyCdMpDaREWCPOgC8mCTBKjl08I1\nDhRiiTpvpYPpqkoUirNSqtM=\n-----END PRIVATE KEY-----\n`
        });
        this.doc.loadInfo();
    }
    async loadOverview() {
        const sheet = this.doc.sheetsByTitle['Dashboard'];
        await sheet.loadCells('A5:D11');
        return {
            usage: {
                daily: sheet.getCellByA1('B5').value,
                monthly: sheet.getCellByA1('B6').value,
                yearly: sheet.getCellByA1('B7').value,
            },
            income: {
                monthly: sheet.getCellByA1('C8').value,
                yearly: sheet.getCellByA1('C9').value,
            },
            remaining: {
                monthly: sheet.getCellByA1('B10').value,
                yearly: sheet.getCellByA1('B11').value,
            }
        };
    }
    async expenseByCategory() {
        const sheet = this.doc.sheetsByTitle['Dashboard'];
        await sheet.loadCells('A15:D23');
        return {
            daily: [
                {
                    category: sheet.getCellByA1('A15').value,
                    amount: sheet.getCellByA1('B15').value,
                },
                {
                    category: sheet.getCellByA1('A16').value,
                    amount: sheet.getCellByA1('B16').value,
                },
                {
                    category: sheet.getCellByA1('A17').value,
                    amount: sheet.getCellByA1('B17').value,
                },
                {
                    category: sheet.getCellByA1('A18').value,
                    amount: sheet.getCellByA1('B18').value,
                },
                {
                    category: sheet.getCellByA1('A19').value,
                    amount: sheet.getCellByA1('B19').value,
                },
                {
                    category: sheet.getCellByA1('A20').value,
                    amount: sheet.getCellByA1('B20').value,
                },
                {
                    category: sheet.getCellByA1('A21').value,
                    amount: sheet.getCellByA1('B21').value,
                },
                {
                    category: sheet.getCellByA1('A22').value,
                    amount: sheet.getCellByA1('B22').value,
                },
                {
                    category: sheet.getCellByA1('A23').value,
                    amount: sheet.getCellByA1('B23').value,
                },
            ],
            monthly: [
                {
                    category: sheet.getCellByA1('A15').value,
                    amount: sheet.getCellByA1('C15').value,
                },
                {
                    category: sheet.getCellByA1('A16').value,
                    amount: sheet.getCellByA1('C16').value,
                },
                {
                    category: sheet.getCellByA1('A17').value,
                    amount: sheet.getCellByA1('C17').value,
                },
                {
                    category: sheet.getCellByA1('A18').value,
                    amount: sheet.getCellByA1('C18').value,
                },
                {
                    category: sheet.getCellByA1('A19').value,
                    amount: sheet.getCellByA1('C19').value,
                },
                {
                    category: sheet.getCellByA1('A20').value,
                    amount: sheet.getCellByA1('C20').value,
                },
                {
                    category: sheet.getCellByA1('A21').value,
                    amount: sheet.getCellByA1('C21').value,
                },
                {
                    category: sheet.getCellByA1('A22').value,
                    amount: sheet.getCellByA1('C22').value,
                },
                {
                    category: sheet.getCellByA1('A23').value,
                    amount: sheet.getCellByA1('C23').value,
                },
            ],
            yearly: [
                {
                    category: sheet.getCellByA1('A15').value,
                    amount: sheet.getCellByA1('D15').value,
                },
                {
                    category: sheet.getCellByA1('A16').value,
                    amount: sheet.getCellByA1('D16').value,
                },
                {
                    category: sheet.getCellByA1('A17').value,
                    amount: sheet.getCellByA1('D17').value,
                },
                {
                    category: sheet.getCellByA1('A18').value,
                    amount: sheet.getCellByA1('D18').value,
                },
                {
                    category: sheet.getCellByA1('A19').value,
                    amount: sheet.getCellByA1('D19').value,
                },
                {
                    category: sheet.getCellByA1('A20').value,
                    amount: sheet.getCellByA1('D20').value,
                },
                {
                    category: sheet.getCellByA1('A21').value,
                    amount: sheet.getCellByA1('D21').value,
                },
                {
                    category: sheet.getCellByA1('A22').value,
                    amount: sheet.getCellByA1('D22').value,
                },
                {
                    category: sheet.getCellByA1('A23').value,
                    amount: sheet.getCellByA1('D23').value,
                },
            ]
        };
    }
    async getMonthlyLimitation() {
        const sheet = this.doc.sheetsByTitle['Dashboard'];
        await sheet.loadCells('A27:D35');
        return [
            {
                category: sheet.getCellByA1('A27').value,
                currentAmount: sheet.getCellByA1('B27').value,
                limit: sheet.getCellByA1('C27').value,
                remainingCost: sheet.getCellByA1('D27').value,
                isOverExpense: sheet.getCellByA1('D27').value <= 0
            },
            {
                category: sheet.getCellByA1('A28').value,
                currentAmount: sheet.getCellByA1('B28').value,
                limit: sheet.getCellByA1('C28').value,
                remainingCost: sheet.getCellByA1('D28').value,
                isOverExpense: sheet.getCellByA1('D28').value <= 0
            }, {
                category: sheet.getCellByA1('A29').value,
                currentAmount: sheet.getCellByA1('B29').value,
                limit: sheet.getCellByA1('C29').value,
                remainingCost: sheet.getCellByA1('D29').value,
                isOverExpense: sheet.getCellByA1('D29').value <= 0
            }, {
                category: sheet.getCellByA1('A30').value,
                currentAmount: sheet.getCellByA1('B30').value,
                limit: sheet.getCellByA1('C30').value,
                remainingCost: sheet.getCellByA1('D30').value,
                isOverExpense: sheet.getCellByA1('D30').value <= 0
            }, {
                category: sheet.getCellByA1('A31').value,
                currentAmount: sheet.getCellByA1('B31').value,
                limit: sheet.getCellByA1('C31').value,
                remainingCost: sheet.getCellByA1('D31').value,
                isOverExpense: sheet.getCellByA1('D31').value <= 0
            }, {
                category: sheet.getCellByA1('A32').value,
                currentAmount: sheet.getCellByA1('B32').value,
                limit: sheet.getCellByA1('C32').value,
                remainingCost: sheet.getCellByA1('D32').value,
                isOverExpense: sheet.getCellByA1('D32').value <= 0
            }, {
                category: sheet.getCellByA1('A33').value,
                currentAmount: sheet.getCellByA1('B33').value,
                limit: sheet.getCellByA1('C33').value,
                remainingCost: sheet.getCellByA1('D33').value,
                isOverExpense: sheet.getCellByA1('D33').value <= 0
            }, {
                category: sheet.getCellByA1('A34').value,
                currentAmount: sheet.getCellByA1('B34').value,
                limit: sheet.getCellByA1('C34').value,
                remainingCost: sheet.getCellByA1('D34').value,
                isOverExpense: sheet.getCellByA1('D34').value <= 0
            }, {
                category: `${sheet.getCellByA1('A35').value}`,
                currentAmount: sheet.getCellByA1('B35').value,
                limit: sheet.getCellByA1('C35').value,
                remainingCost: sheet.getCellByA1('D35').value,
                isOverExpense: sheet.getCellByA1('D35').value <= 0
            }
        ];
    }
    async getExpenseByMonth() {
        const sheet = this.doc.sheetsByTitle['Dashboard'];
        await sheet.loadCells('A40:D51');
        return [
            {
                month: sheet.getCellByA1('A40').value,
                amount: sheet.getCellByA1('B40').value,
            },
            {
                month: sheet.getCellByA1('A41').value,
                amount: sheet.getCellByA1('B41').value,
            },
            {
                month: sheet.getCellByA1('A42').value,
                amount: sheet.getCellByA1('B42').value,
            },
            {
                month: sheet.getCellByA1('A43').value,
                amount: sheet.getCellByA1('B43').value,
            },
            {
                month: sheet.getCellByA1('A44').value,
                amount: sheet.getCellByA1('B44').value,
            },
            {
                month: sheet.getCellByA1('A45').value,
                amount: sheet.getCellByA1('B45').value,
            },
            {
                month: sheet.getCellByA1('A46').value,
                amount: sheet.getCellByA1('B46').value,
            },
            {
                month: sheet.getCellByA1('A47').value,
                amount: sheet.getCellByA1('B47').value,
            },
            {
                month: sheet.getCellByA1('A48').value,
                amount: sheet.getCellByA1('B48').value,
            },
            {
                month: sheet.getCellByA1('A49').value,
                amount: sheet.getCellByA1('B49').value,
            },
            {
                month: sheet.getCellByA1('A50').value,
                amount: sheet.getCellByA1('B50').value,
            },
            {
                month: sheet.getCellByA1('A51').value,
                amount: sheet.getCellByA1('B51').value,
            }
        ];
    }
    async getDailyExpense() {
        const sheet = this.doc.sheetsByTitle['Dashboard'];
        await sheet.loadCells('A59:D81');
        const rowStartIndex = 59;
        const rowEndIndex = 81;
        const columns = ['A', 'B', 'C', 'D'];
        const responses = [];
        let isStop = false;
        for (let row = rowStartIndex; row <= rowEndIndex; row++) {
            let date, category, amount, description;
            for (const column of columns) {
                const value = sheet.getCellByA1(`${column}${row}`).value;
                if (!value) {
                    isStop = true;
                    break;
                }
                ;
                if (column === 'A') {
                    date = (0, convert_1.ExcelDateToJSDate)(value);
                }
                if (column === 'B')
                    category = value;
                if (column === 'C')
                    amount = value;
                if (column === 'D')
                    description = value;
            }
            if (isStop)
                break;
            responses.push({
                date, category, amount, description
            });
        }
        return responses;
    }
    async addExpenseByDaily(createExpenseDto) {
        const sheet = this.doc.sheetsByTitle['Expenses'];
        await sheet.loadCells('E1:E2');
        const blankIndexCell = sheet.getCellByA1(`E2`);
        await sheet.loadCells(`A${blankIndexCell.value - 1}:D${blankIndexCell.value + createExpenseDto.expenses.length}`);
        let blankIndexValue = blankIndexCell.value;
        for (const expense of createExpenseDto.expenses) {
            const [year, month, day] = expense.date.split('-');
            const dateBlankCell = sheet.getCellByA1(`A${blankIndexValue}`);
            const categoryBlankCell = sheet.getCellByA1(`B${blankIndexValue}`);
            const amountBlankCell = sheet.getCellByA1(`C${blankIndexValue}`);
            const descriptionBlankCell = sheet.getCellByA1(`D${blankIndexValue}`);
            dateBlankCell.value = `=DATE(${year},${month},${day})`;
            categoryBlankCell.value = expense.category;
            amountBlankCell.value = expense.amount;
            descriptionBlankCell.value = expense.description;
            blankIndexValue += 1;
        }
        blankIndexCell.value = blankIndexValue;
        await sheet.saveUpdatedCells();
        this.emailService.sendExpenseAddedMail({
            to: "pvthanh98it@gmail.com",
            title: "Hi!",
            body: "Your daily expense was added successfully.",
            subject: "Expense Added",
            expenses: createExpenseDto.expenses
        });
        return true;
    }
    async getCategoryByFood(category) {
        const sheet = this.doc.sheetsByTitle['Expense By Category'];
        const data = [];
        let totalCost = 0;
        const sheetInfo = (0, common_constant_1.ExpenseByCategoryIndexEnmum)(category);
        await sheet.loadCells(sheetInfo.LOAD_CELL);
        for (let i = sheetInfo.START_ROW_INDEX; i <= sheetInfo.END_ROW_INDEX; i++) {
            const date = sheet.getCellByA1(`${sheetInfo.COLUMN_1}${i}`).value;
            const categoryValue = sheet.getCellByA1(`${sheetInfo.COLUMN_2}${i}`).value;
            const amount = sheet.getCellByA1(`${sheetInfo.COLUMN_3}${i}`).value;
            const description = sheet.getCellByA1(`${sheetInfo.COLUMN_4}${i}`).value;
            totalCost += amount;
            if (!date)
                break;
            data.push({ date, category: categoryValue, amount, description });
        }
        return {
            data: data,
            totalCost
        };
    }
};
GoogleSheetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        email_service_1.EmailService])
], GoogleSheetService);
exports.GoogleSheetService = GoogleSheetService;
//# sourceMappingURL=google_sheet.service.js.map