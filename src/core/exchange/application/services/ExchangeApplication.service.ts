import { Exchange } from '../../domain/entities/Exchange';
import { ExchangeRate } from '../../domain/entities/ExchangeRate';
import { ExchangeService } from '../../domain/ports/inbound/ExchangeService';
import { ExchangeRateService } from '../../domain/ports/inbound/ExchangeRateService';

export class ExchangeApplicationService
  implements ExchangeService, ExchangeRateService
{
  constructor(
    private exchangeRepository: ExchangeService,
    private exchangeRateRepository: ExchangeRateService,
  ) {}
  async findExchange(id: number): Promise<Exchange> {
    return this.exchangeRepository.findExchange(id);
  }
  async convert(
    sourceCurrency: string,
    targetCurrency: string,
    amount: number,
  ): Promise<Exchange> {
    return this.exchangeRepository.convert(
      sourceCurrency,
      targetCurrency,
      amount,
    );
  }
  async getExchangeRate(sourceCurrency, targetCurrency): Promise<ExchangeRate> {
    return this.exchangeRateRepository.getExchangeRate(
      sourceCurrency,
      targetCurrency,
    );
  }
  async getRate(sourceCurrency, targetCurrency): Promise<number> {
    return this.exchangeRateRepository.getRate(sourceCurrency, targetCurrency);
  }
  async getExchangeRates(): Promise<ExchangeRate[]> {
    return this.exchangeRateRepository.getExchangeRates();
  }
  async getExchangeRateById(id: number): Promise<ExchangeRate> {
    return this.exchangeRateRepository.getExchangeRateById(id);
  }

  async setExchangeRate(
    sourceCurrency: string,
    targetCurrency: string,
    rate: number,
  ): Promise<ExchangeRate> {
    return this.exchangeRateRepository.setExchangeRate(
      sourceCurrency,
      targetCurrency,
      rate,
    );
  }
}
