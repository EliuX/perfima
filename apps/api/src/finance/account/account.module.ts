import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { User } from '../../user/entities/user.entity';
import { UserModule } from '../../user/user.module';
import { AuthModule } from '../../auth/auth.module';
import { ConfigModule } from '../../config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '../../auth/jwt-config.service';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([Account, User]),
    JwtModule.registerAsync({
      imports: [AuthModule],
      useExisting: JwtConfigService,
      inject: [JwtConfigService],
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
