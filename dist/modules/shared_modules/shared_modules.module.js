"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModulesModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const log_entity_1 = require("../../entities/log.entity");
const email_service_1 = require("./email.service");
const google_sheet_service_1 = require("./google_sheet.service");
const log_service_1 = require("./log.service");
const shared_modules_service_1 = require("./shared_modules.service");
let SharedModulesModule = class SharedModulesModule {
};
SharedModulesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([log_entity_1.Log])
        ],
        providers: [
            shared_modules_service_1.SharedModulesService,
            google_sheet_service_1.GoogleSheetService,
            log_service_1.LogService,
            email_service_1.EmailService
        ],
        exports: [
            google_sheet_service_1.GoogleSheetService,
            log_service_1.LogService,
            email_service_1.EmailService
        ]
    })
], SharedModulesModule);
exports.SharedModulesModule = SharedModulesModule;
//# sourceMappingURL=shared_modules.module.js.map