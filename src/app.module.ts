import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModulesModule } from './modules/shared_modules/shared_modules.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { Log } from './entities/log.entity';
import { CommonModule } from './modules/common/common.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { Friend } from './entities/friend.entity';
import { ChatGateway } from './app.gateway';
require("dotenv").config()

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public'),
      serveRoot: "/static/",
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
      entities: [
        User,
        Log,
        Friend
      ],
      synchronize: true,
    }),
    DashboardModule,
    SharedModulesModule,
    AuthModule,
    UserModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService, TasksService, ChatGateway],
})
export class AppModule {}