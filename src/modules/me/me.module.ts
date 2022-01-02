import { Module } from '@nestjs/common';
import { MeResolver } from './me.resolver';

@Module({
  imports: [],
  providers: [MeResolver],
})
export class MeModule {}
