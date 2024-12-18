import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './users/user.module';
import { User } from './users/model/user.entity';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
          synchronize: !configService.isProduction(),
          entities: [User],
          logging: true,
          type: 'mongodb',
          url: configService.getMongoURI(),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {
}
