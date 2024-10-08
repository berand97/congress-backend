import { ConfigService } from '@shared/config/config.service';
import { DataSource } from 'typeorm';

const config: ConfigService = new ConfigService(
  __dirname + `/environments/${process.env.NODE_ENV.trim()}.env`,
);

export const AppDataSource = new DataSource({
  name: 'default',
  type: config.get('DRIVER'),
  host: config.get('HOST'),
  port: config.get('PORT'),
  username: config.get('USERNAME'),
  password: config.get('PASSWORD'),
  database: config.get('DATABASE'),
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  subscribers: [__dirname + '/subscribers/*.subscriber{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/*.migration{.ts,.js}'],
  synchronize: config.get('SYNCHRONIZE'),
  logging: config.get('LOGGING'),
  logger: config.get('LOGGER'),
});
