import { DataSource, DataSourceOptions } from "typeorm";

export const ormconfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'main',
    entities: ["src/**/*.entity.ts"],
    migrations: ["src/migrations/*-migrate.ts"]
}
  
export default new DataSource(ormconfig)