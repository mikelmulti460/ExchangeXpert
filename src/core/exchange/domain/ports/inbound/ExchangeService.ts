import { Exchange } from '../../entities/Exchange';
export interface ExchangeService {
  findExchange(id: number): Promise<Exchange>;
  convert(
    sourceCurrency: string,
    targetCurrency: string,
    amount: number,
  ): Promise<Exchange>;
}
