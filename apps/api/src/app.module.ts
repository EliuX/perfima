import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'node:process';

@Module({
  controllers: [AppController],
  imports: [
    // MongooseModule.forRoot(process.env.MONGO_URI)
  ],
  providers: [AppService],
})
export class AppModule {}
