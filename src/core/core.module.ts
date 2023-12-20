import { DynamicModule, Module, Type } from '@nestjs/common';
import { ExchangeRepository } from './exchange/domain/ports/outbound/Exchange.repository';
import { ExchangeRateRepository } from './exchange/domain/ports/outbound/ExchangeRate.repository';
import { ExchangeApplicationService } from './exchange/application/services/ExchangeApplication.service';
import { ExchangeDomainService } from './exchange/domain/services/ExchangeDomain.service';
import { ExchangeRateDomainService } from './exchange/domain/services/ExchangeRateDomain.service';

export type CoreModuleOptions = {
  modules: Type[];
  adapters?: {
    exchangeRepository: Type<ExchangeRepository>;
    exchangeRateRepository: Type<ExchangeRateRepository>;
  };
};

// Application constants
export const EXCHANGE_APPLICATION = 'EXCHANGE_APPLICATION';

// Repository constants
export const EXCHANGE_SERVICE = 'EXCHANGE_SERVICE';
export const EXCHANGE_RATE_SERVICE = 'EXCHANGE_RATE_SERVICE';

@Module({})
export class CoreModule {
  static register({ modules, adapters }: CoreModuleOptions): DynamicModule {
    const { exchangeRepository, exchangeRateRepository } = adapters;

    const ExchangeApplicationProvider = {
      provide: EXCHANGE_APPLICATION,
      useFactory(
        exchange: ExchangeDomainService,
        exchangeRate: ExchangeRateDomainService,
      ) {
        return new ExchangeApplicationService(exchange, exchangeRate);
      },
      inject: [EXCHANGE_SERVICE, EXCHANGE_RATE_SERVICE],
    };

    const ExchangeServiceProvider = {
      provide: EXCHANGE_SERVICE,
      useFactory(repository: ExchangeRepository) {
        return new ExchangeDomainService(repository);
      },
      inject: [exchangeRepository],
    };

    const ExchangeRateServiceProvider = {
      provide: EXCHANGE_RATE_SERVICE,
      useFactory(repository: ExchangeRateRepository) {
        return new ExchangeRateDomainService(repository);
      },
      inject: [exchangeRateRepository],
    };

    return {
      module: CoreModule,
      global: true,
      imports: [...modules],
      providers: [
        ExchangeApplicationProvider,
        ExchangeServiceProvider,
        ExchangeRateServiceProvider,
      ],
      exports: [EXCHANGE_APPLICATION, EXCHANGE_RATE_SERVICE],
    };
  }
}
