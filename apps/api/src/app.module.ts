import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
 import { User } from './auth/user/model/user.entity';
import { AuthModule } from './auth/auth.module';
import { FinanceModule } from './finance/finance.module';
import { Account } from './finance/account/entities/account.entity';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule,
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
    AuthModule,
    FinanceModule,
  ],
  providers: [AppService],
})
export class AppModule {}
