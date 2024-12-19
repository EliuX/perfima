import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { User } from '../../user/entities/user.entity';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Account, User])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
