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

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public'),
      serveRoot: "/app/",
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-52-71-23-11.compute-1.amazonaws.com',
      port: 5432,
      username: 'jfxwylyhvkbpng',
      password: '39e28d78ef50d58a8e2ad4321c9517df9ac8ff3d519b73e314ec4a02ecfcc23a',
      database: 'd86adq6eek3nqm',
      entities: [
        User
      ],
      synchronize: true,
    }),
    DashboardModule,
    SharedModulesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
