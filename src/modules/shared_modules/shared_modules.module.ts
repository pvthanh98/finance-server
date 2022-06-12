import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleSheetService } from './google_sheet.service';
import { SharedModulesService } from './shared_modules.service';

@Module({
  imports: [
    ConfigModule
  ],
  providers: [
    SharedModulesService,
    GoogleSheetService
  ],
  exports:[
    GoogleSheetService
  ]
})
export class SharedModulesModule { }
