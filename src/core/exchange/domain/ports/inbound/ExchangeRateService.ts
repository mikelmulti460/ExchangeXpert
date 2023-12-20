import { ExchangeRate } from '../../entities/ExchangeRate';
export interface ExchangeRateService {
  getExchangeRate(
    sourceCurrency: string,
    targetCurrency: string,
  ): Promise<ExchangeRate>;
  getRate(sourceCurrency: string, targetCurrency: string): Promise<number>;
  getExchangeRates(): Promise<ExchangeRate[]>;
  getExchangeRateById(id: number): Promise<ExchangeRate>;
  // setExchangeRate(sourceCurrency: string, targetCurrency: string, rate: number): Promise<ExchangeRate>;
}
