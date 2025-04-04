import { DataSource } from 'typeorm';
import { postgresqlConfig } from './postgresql';
import { User } from '../entities/User';

const config = postgresqlConfig;

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...config,
  username: config.user,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});
