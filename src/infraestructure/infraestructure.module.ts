import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRepositoryAdapter } from './adapters/exchange.repository.adapter';
import { ExchangeRateRepositoryAdapter } from './adapters/exchange-rate.repository.adapter';
import { ExchangeEntity } from './database/entities/Exchange.entity';
import { ExchangeRateEntity } from './database/entities/ExchangeRate.entity';
import { HttpServerModule } from './http-server/http-server.module';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [ExchangeRepositoryAdapter, ExchangeRateRepositoryAdapter],
  exports: [ExchangeRepositoryAdapter, ExchangeRateRepositoryAdapter],
  imports: [
    HttpServerModule,
    DatabaseModule,
    TypeOrmModule.forFeature([ExchangeEntity, ExchangeRateEntity]),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
    AuthModule,
  ],
})
export class InfraestructureModule {}
