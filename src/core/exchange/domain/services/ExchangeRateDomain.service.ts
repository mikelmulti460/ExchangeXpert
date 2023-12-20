import { ExchangeRateRepository } from '../ports/outbound/ExchangeRate.repository';
import { ExchangeRateService } from '../ports/inbound/ExchangeRateService';
import { ExchangeRate } from '../entities/ExchangeRate';

export class ExchangeRateDomainService implements ExchangeRateService {
  constructor(private repository: ExchangeRateRepository) {}
  async getExchangeRate(sourceCurrency, targetCurrency): Promise<ExchangeRate> {
    return this.repository.getExchangeRate(sourceCurrency, targetCurrency);
  }
  async getRate(sourceCurrency, targetCurrency): Promise<number> {
    return this.repository.getRate(sourceCurrency, targetCurrency);
  }
  async getExchangeRates(): Promise<ExchangeRate[]> {
    return this.repository.getExchangeRates();
  }
  async getExchangeRateById(id: number): Promise<ExchangeRate> {
    return this.repository.getExchangeRateById(id);
  }
  // async setExchangeRate(sourceCurrency, targetCurrency, rate): Promise<ExchangeRate> {
  //     return this.repository.setExchangeRate(sourceCurrency, targetCurrency, rate);
  // }
}
