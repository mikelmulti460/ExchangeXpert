import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeEntity } from '../../infraestructure/database/entities/Exchange.entity';
import { Exchange } from '../../core/exchange/domain/entities/Exchange';
import { ExchangeRepository } from '../../core/exchange/domain/ports/outbound/Exchange.repository';
import { EXCHANGE_RATE_SERVICE } from '../../core/core.module';
import { ExchangeRateDomainService } from '../../core/exchange/domain/services/ExchangeRateDomain.service';

@Injectable()
export class ExchangeRepositoryAdapter implements ExchangeRepository {
  constructor(
    @InjectRepository(ExchangeEntity)
    private exchangeRepository: Repository<ExchangeEntity>,
    @Inject(EXCHANGE_RATE_SERVICE)
    private exchangeRateService: ExchangeRateDomainService,
  ) {}
  async findExchange(id: number): Promise<Exchange> {
    return this.exchangeRepository.findOneBy({
      exchangeId: id,
    });
  }
  async convert(
    sourceCurrency: string,
    targetCurrency: string,
    amount: number,
  ): Promise<Exchange> {
    const rate = await this.exchangeRateService.getRate(
      sourceCurrency,
      targetCurrency,
    );
    const convertedAmount = amount * rate;
    return this.exchangeRepository.save({
      sourceCurrency,
      targetCurrency,
      amount,
      convertedAmount,
      rate,
    });
  }
}
