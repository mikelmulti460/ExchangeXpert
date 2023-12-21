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
import { UserRepositoryAdapter } from './adapters/user.repository.dapter';
import { UserEntity } from './database/entities/User.entity';

@Module({
  providers: [
    ExchangeRepositoryAdapter,
    ExchangeRateRepositoryAdapter,
    UserRepositoryAdapter,
  ],
  exports: [
    ExchangeRepositoryAdapter,
    ExchangeRateRepositoryAdapter,
    UserRepositoryAdapter,
  ],
  imports: [
    HttpServerModule,
    DatabaseModule,
    TypeOrmModule.forFeature([ExchangeEntity, ExchangeRateEntity, UserEntity]),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
    AuthModule,
  ],
})
export class InfraestructureModule {}
