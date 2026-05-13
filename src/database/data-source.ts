// data-source.ts
import { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

// for module
export const dataSourceOptions: DataSourceOptions = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  type: (process.env.DB_TYPE || 'sqlite') as any,
  database: process.env.DB_NAME ?? 'db.sqlite',
  synchronize: process.env.NODE_ENV === 'production',
};

// for migrations
export default new DataSource({
  ...dataSourceOptions,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
