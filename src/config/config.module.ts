import { Module } from '@nestjs/common';
import { ConfigService } from '@shared/config/config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        __dirname +
          `/environments/${process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development'}.env`,
      ),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
