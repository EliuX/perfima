import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '../config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtConfigService } from './jwt-config.service';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtConfigService],
  exports: [AuthService, JwtConfigService, UserModule],
})
export class AuthModule {}
