import { ExchangeDTO } from '../shared/dto/Exchange.dto';

export interface ExchangeApplication {
  findExchange(id: number): Promise<ExchangeDTO>;
  convert(
    sourceCurrency: string,
    targetCurrency: string,
    amount: number,
  ): Promise<ExchangeDTO>;
  getExchangeRate(
    sourceCurrency: string,
    targetCurrency: string,
  ): Promise<ExchangeDTO>;
  getExchangeRates(): Promise<ExchangeDTO[]>;
  getRate(sourceCurrency: string, targetCurrency: string): Promise<number>;
  getExchangeRateById(id: number): Promise<ExchangeDTO>;
  // setExchangeRate(sourceCurrency: string, targetCurrency: string, rate: number): Promise<ExchangeDTO>;
}
