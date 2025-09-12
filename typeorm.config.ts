import { DataSource } from 'typeorm';
import { User } from './src/user/user.entity';
import { Funcao } from './src/funcao/funcao.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'servidor01',
  database: 'task_management_api2',
  entities: [User, Funcao], //
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
