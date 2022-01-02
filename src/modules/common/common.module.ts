import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';
import { UtilService } from './utils.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [EmailService, UtilService],
  exports: [EmailService, UtilService],
})
export class CommonModule {}
