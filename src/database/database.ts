import { type DataSourceOptions, DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export const databaseOptions: DataSourceOptions = {
  type: configService.get<'postgres'>('DB_TYPE') ?? 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: ['dist/**/*.entity.js'],
  synchronize: configService.get<boolean>('DB_IS_SYNCHRONIZED'),
  logging: configService.get<boolean>('DB_IS_LOGGING'),
  migrations: ['dist/database/migrations/*.js'],
};

const database = new DataSource(databaseOptions);
export default database;
