import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeRateRepository } from 'src/core/exchange/domain/ports/outbound/ExchangeRate.repository';
import { ExchangeRate } from 'src/core/exchange/domain/entities/ExchangeRate';
import { ExchangeRateEntity } from '../database/entities/ExchangeRate.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ExchangeRateRepositoryAdapter implements ExchangeRateRepository {
  private readonly cacheTTL = 30; // tiempo de vida de la caché en segundos
  private readonly cachePrefix = 'exchangeRate';

  constructor(
    @InjectRepository(ExchangeRateEntity)
    private exchangeRateRepository: Repository<ExchangeRateEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getExchangeRate(
    sourceCurrency: string,
    targetCurrency: string,
  ): Promise<ExchangeRate> {
    const cacheKey = `${this.cachePrefix}-${sourceCurrency}-${targetCurrency}`;
    let exchangeRate = await this.cacheManager.get<ExchangeRate>(cacheKey);

    if (!exchangeRate) {
      exchangeRate = await this.exchangeRateRepository.findOne({
        where: {
          sourceCurrency,
          targetCurrency,
        },
      });

      await this.cacheManager.set(cacheKey, exchangeRate, this.cacheTTL);
    }

    return exchangeRate;
  }

  async getRate(
    sourceCurrency: string,
    targetCurrency: string,
  ): Promise<number> {
    const exchangeRate = await this.getExchangeRate(
      sourceCurrency,
      targetCurrency,
    );
    if (exchangeRate) {
      return exchangeRate.rate;
    }
    return null;
  }

  async getExchangeRates(): Promise<ExchangeRate[]> {
    return this.exchangeRateRepository.find();
  }

  async setExchangeRate(
    sourceCurrency: string,
    targetCurrency: string,
    rate: number,
  ): Promise<ExchangeRate> {
    const exchangeRate = await this.getExchangeRate(
      sourceCurrency,
      targetCurrency,
    );
    const cacheKey = `${this.cachePrefix}-${sourceCurrency}-${targetCurrency}`;
    if (exchangeRate) {
      exchangeRate.rate = rate;
      await this.cacheManager.del(cacheKey);
      return this.exchangeRateRepository.save(exchangeRate);
    } else {
      const newExchangeRate = await this.exchangeRateRepository.save({
        sourceCurrency,
        targetCurrency,
        rate,
      });
      await this.cacheManager.set(cacheKey, newExchangeRate, this.cacheTTL);
      return newExchangeRate;
    }
  }

  async getExchangeRateById(id: number): Promise<ExchangeRate> {
    return this.exchangeRateRepository.findOneBy({
      id,
    });
  }
}
