import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModulesModule } from './modules/shared_modules/shared_modules.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DashboardModule,
    SharedModulesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
