import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { SharedModulesModule } from '../shared_modules/shared_modules.module';
import { UserModule } from '../user/user.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    SharedModulesModule,
    UserModule,
    ChatModule
  ],
  providers: [CommonService],
  controllers: [CommonController]
})
export class CommonModule {}
