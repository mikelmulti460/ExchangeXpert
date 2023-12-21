import { ExchangeService } from '../ports/inbound/ExchangeService';
import { Exchange } from '../entities/Exchange';
import { ExchangeRepository } from '../ports/outbound/Exchange.repository';
import { ExchangeServiceError } from '../../shared/error/ExchangeService.error';

export class ExchangeDomainService implements ExchangeService {
  constructor(private repository: ExchangeRepository) {}
  async findExchange(id: number): Promise<Exchange> {
    const exchange = await this.repository.findExchange(id);
    if (!exchange) {
      throw new ExchangeServiceError(`Exchange with id ${id} not found`);
    }
    return exchange;
  }
  async convert(
    sourceCurrency: string,
    targetCurrency: string,
    amount: number,
  ): Promise<Exchange> {
    const exchange = await this.repository.convert(
      sourceCurrency,
      targetCurrency,
      amount,
    );
    return exchange;
  }
}
