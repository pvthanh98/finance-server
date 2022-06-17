import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { SharedModulesModule } from '../shared_modules/shared_modules.module';

@Module({
  imports: [SharedModulesModule],
  providers: [CommonService],
  controllers: [CommonController]
})
export class CommonModule {}
