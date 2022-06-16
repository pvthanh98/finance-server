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
require("dotenv").config()

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public'),
      serveRoot: "/app/",
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // port: parseInt(process.env.DB_PORT) || 5432,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASS,
      // database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false
      },
      entities: [
        User
      ],
      synchronize: true,
    }),
    DashboardModule,
    SharedModulesModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}