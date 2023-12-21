import { ExchangeRateRepository } from '../ports/outbound/ExchangeRate.repository';
import { ExchangeRateService } from '../ports/inbound/ExchangeRateService';
import { ExchangeRate } from '../entities/ExchangeRate';
import { ExchangeRateServiceError } from '../../shared/error/ExchangeRateService.error';

export class ExchangeRateDomainService implements ExchangeRateService {
  constructor(private repository: ExchangeRateRepository) {}
  async getExchangeRate(sourceCurrency, targetCurrency): Promise<ExchangeRate> {
    const exchangeRate = await this.repository.getExchangeRate(
      sourceCurrency,
      targetCurrency,
    );
    if (!exchangeRate) {
      throw new ExchangeRateServiceError(
        `Exchange rate with source currency ${sourceCurrency} and target currency ${targetCurrency} not found`,
      );
    }
    return exchangeRate;
  }
  async getRate(sourceCurrency, targetCurrency): Promise<number> {
    const exchangeRate = this.repository.getRate(
      sourceCurrency,
      targetCurrency,
    );
    if (!exchangeRate) {
      throw new ExchangeRateServiceError(
        `Exchange rate with source currency ${sourceCurrency} and target currency ${targetCurrency} not found`,
      );
    }
    return exchangeRate;
  }
  async getExchangeRates(): Promise<ExchangeRate[]> {
    const exchangeRates = this.repository.getExchangeRates();
    if (!exchangeRates) {
      throw new ExchangeRateServiceError('Exchange rates not found');
    }
    return exchangeRates;
  }
  async getExchangeRateById(id: number): Promise<ExchangeRate> {
    const exchangeRate = await this.repository.getExchangeRateById(id);
    if (!exchangeRate) {
      throw new ExchangeRateServiceError(
        `Exchange rate with id ${id} not found`,
      );
    }
    return exchangeRate;
  }

  async setExchangeRate(
    sourceCurrency: string,
    targetCurrency: string,
    rate: number,
  ): Promise<ExchangeRate> {
    return this.repository.setExchangeRate(
      sourceCurrency,
      targetCurrency,
      rate,
    );
  }
}
