"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const config_1 = require("@nestjs/config");
const shared_modules_module_1 = require("./modules/shared_modules/shared_modules.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const auth_module_1 = require("./modules/auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const user_module_1 = require("./modules/user/user.module");
const log_entity_1 = require("./entities/log.entity");
const common_module_1 = require("./modules/common/common.module");
const schedule_1 = require("@nestjs/schedule");
const tasks_service_1 = require("./tasks.service");
require("dotenv").config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                serveRoot: "/app/",
            }),
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                },
                entities: [
                    user_entity_1.User,
                    log_entity_1.Log
                ],
                synchronize: true,
            }),
            dashboard_module_1.DashboardModule,
            shared_modules_module_1.SharedModulesModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            common_module_1.CommonModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, tasks_service_1.TasksService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map