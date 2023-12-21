import { ExchangeRate } from '../../entities/ExchangeRate';
export interface ExchangeRateRepository {
  getExchangeRate(
    sourceCurrency: string,
    targetCurrency: string,
  ): Promise<ExchangeRate>;
  getRate(sourceCurrency: string, targetCurrency: string): Promise<number>;
  getExchangeRateById(id: number): Promise<ExchangeRate>;
  getExchangeRates(): Promise<ExchangeRate[]>;
  setExchangeRate(
    sourceCurrency: string,
    targetCurrency: string,
    rate: number,
  ): Promise<ExchangeRate>;
}
