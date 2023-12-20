// database.config.ts
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: parseInt(configService.get('DATABASE_PORT')),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  synchronize: true,
  logging: false,
});
