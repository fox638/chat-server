import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  exports: [TypeOrmModule],
})
export class UserModule {}
