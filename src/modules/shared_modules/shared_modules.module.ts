import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';
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
    LogService
  ],
  exports:[
    GoogleSheetService,
    LogService
  ]
})
export class SharedModulesModule { }
