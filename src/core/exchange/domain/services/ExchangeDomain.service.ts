import { ExchangeService } from '../ports/inbound/ExchangeService';
import { Exchange } from '../entities/Exchange';
import { ExchangeRepository } from '../ports/outbound/Exchange.repository';

export class ExchangeDomainService implements ExchangeService {
  constructor(private repository: ExchangeRepository) {}
  async findExchange(id: number): Promise<Exchange> {
    return this.repository.findExchange(id);
  }
  async convert(
    sourceCurrency: string,
    targetCurrency: string,
    amount: number,
  ): Promise<Exchange> {
    return this.repository.convert(sourceCurrency, targetCurrency, amount);
  }
}
