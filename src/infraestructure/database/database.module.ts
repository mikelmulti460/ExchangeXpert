import { Module } from '@nestjs/common';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
// import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../shared/config/database.config';
import { ExchangeEntity } from './entities/Exchange.entity';
import { ExchangeRateEntity } from './entities/ExchangeRate.entity';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const database = config.get<DatabaseConfig>('database');
        return {
          type: 'postgres',
          host: database.host,
          port: database.port,
          username: database.user,
          password: database.password,
          database: database.name,
          entities: [ExchangeEntity, ExchangeRateEntity],
          synchronize: false,
          logging: ['query'],
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class DatabaseModule {}
