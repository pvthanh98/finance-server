import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';
import { EmailService } from './email.service';
import { GoogleSheetService } from './google_sheet.service';
import { LogService } from './log.service';
import { SharedModulesService } from './shared_modules.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Log])
  ],
  providers: [
    SharedModulesService,
    GoogleSheetService,
    LogService,
    EmailService
  ],
  exports:[
    GoogleSheetService,
    LogService,
    EmailService
  ]
})
export class SharedModulesModule { }
