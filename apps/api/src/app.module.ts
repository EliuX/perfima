import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
 import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { FinanceModule } from './finance/finance.module';
import { Account } from './finance/account/entities/account.entity';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule,
    UserModule,
    AuthModule,
    FinanceModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        synchronize: !configService.isProduction(),
        entities: [User, Account],
        logging: true,
        type: 'mongodb',
        url: configService.getMongoURI(),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
