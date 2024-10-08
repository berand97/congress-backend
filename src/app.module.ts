import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { SponsorsModule } from './modules/sponsors/sponsors.module';
import { ModalitiesModule } from './modules/modalities/modalities.module';
import { KnowledgeModule } from './modules/knowledge/knowledge.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { RolesModule } from './modules/roles/roles.module';
import { UniversityModule } from './modules/university/university.module';
import { ConfigService } from './shared/config/config.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { MenuModule } from './modules/menu/menu.module';
import { ServeStaticModule } from '@nestjs/serve-static';

export const config: ConfigService = new ConfigService(
  __dirname + `/config/environments/${process.env.NODE_ENV.trim()}.env`,
);

console.log(process.env.NODE_ENV);


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: 'public',
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 10,
        },
      ],
    }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: config.get('DRIVER'),
      host: config.get('HOST'),
      port: config.get('PORT'),
      username: config.get('USERNAME'),
      password: config.get('PASSWORD'),
      database: config.get('DATABASE'),
      entities: [__dirname + '/modules/**/entities/*.entity{.ts,.js}'],
      subscribers: [
        __dirname + '/modules/**/subscribers/*.subscriber{.ts,.js}',
      ],
      migrationsTableName: 'migrations',
      migrations: [__dirname + '/modules/**/migrations/*.migration{.ts,.js}'],
      synchronize: config.get('SYNCHRONIZE'),
      logging: config.get('LOGGING'),
      logger: config.get('LOGGER'),
    }),
    AuthenticationModule,
    SponsorsModule,
    ModalitiesModule,
    KnowledgeModule,
    ScheduleModule,
    RolesModule,
    UniversityModule,
    UserModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
