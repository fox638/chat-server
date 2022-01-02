import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { MeModule } from 'modules/me/me.module';
import { RootResolver } from './root.resolver';

@Module({
  imports: [AuthModule, MeModule],
  providers: [RootResolver],
})
export class RootGqlModule {}
