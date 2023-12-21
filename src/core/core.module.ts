import { DynamicModule, Module, Type } from '@nestjs/common';
import { ExchangeRepository } from './exchange/domain/ports/outbound/Exchange.repository';
import { ExchangeRateRepository } from './exchange/domain/ports/outbound/ExchangeRate.repository';
import { ExchangeApplicationService } from './exchange/application/services/ExchangeApplication.service';
import { ExchangeDomainService } from './exchange/domain/services/ExchangeDomain.service';
import { ExchangeRateDomainService } from './exchange/domain/services/ExchangeRateDomain.service';
import { UserRepository } from './users/domain/ports/outbound/User.repository';
import { UserApplicationService } from './users/application/services/UserAppliction.service';
import { UserDomainService } from './users/domain/services/UserDomain.service';

export type CoreModuleOptions = {
  modules: Type[];
  adapters?: {
    exchangeRepository: Type<ExchangeRepository>;
    exchangeRateRepository: Type<ExchangeRateRepository>;
    userRepository: Type<UserRepository>;
  };
};

// Application constants
export const EXCHANGE_APPLICATION = 'EXCHANGE_APPLICATION';
export const USER_APPLICATION = 'USER_APPLICATION';

// Repository constants
export const EXCHANGE_SERVICE = 'EXCHANGE_SERVICE';
export const EXCHANGE_RATE_SERVICE = 'EXCHANGE_RATE_SERVICE';
export const USER_SERVICE = 'USER_SERVICE';

@Module({})
export class CoreModule {
  static register({ modules, adapters }: CoreModuleOptions): DynamicModule {
    const { exchangeRepository, exchangeRateRepository, userRepository } =
      adapters;

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

    const UserApplicationProvider = {
      provide: USER_APPLICATION,
      useFactory(user: UserDomainService) {
        return new UserApplicationService(user);
      },
      inject: [USER_SERVICE],
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

    const UserServiceProvider = {
      provide: USER_SERVICE,
      useFactory(repository: UserRepository) {
        return new UserDomainService(repository);
      },
      inject: [userRepository],
    };

    return {
      module: CoreModule,
      global: true,
      imports: [...modules],
      providers: [
        ExchangeApplicationProvider,
        ExchangeServiceProvider,
        ExchangeRateServiceProvider,
        UserApplicationProvider,
        UserServiceProvider,
      ],
      exports: [EXCHANGE_APPLICATION, EXCHANGE_RATE_SERVICE, USER_APPLICATION],
    };
  }
}
