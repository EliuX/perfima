import { ConfigService as NestConfigService } from '@nestjs/config';

export class ConfigService {
  constructor(private configService: NestConfigService) {}

  public getMongoURI() {
    return this.configService.getOrThrow('MONGO_URI');
  }

  public getDatabaseName() {
    return this.configService.get('MONGO_DB') || 'perfima';
  }

  public isProduction() {
    const mode = this.configService.getOrThrow('MODE');
    return mode == 'prod' || mode == 'production';
  }
}
