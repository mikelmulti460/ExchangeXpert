import { Exchange } from '../../entities/Exchange';

export interface ExchangeRepository {
  findExchange(id: number): Promise<Exchange>;
  convert(
    sourceCurrency: string,
    targetCurrency: string,
    amount: number,
  ): Promise<Exchange>;
}
