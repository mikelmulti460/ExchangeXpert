import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { InfraestructureModule } from './infraestructure/infraestructure.module';
import { ExchangeRepositoryAdapter } from './infraestructure/adapters/exchange.repository.adapter';
import { ExchangeRateRepositoryAdapter } from './infraestructure/adapters/exchange-rate.repository.adapter';
import { SharedModule } from './infraestructure/shared/shared.module';
import { UserRepositoryAdapter } from './infraestructure/adapters/user.repository.dapter';

@Module({
  imports: [
    InfraestructureModule,
    SharedModule,
    CoreModule.register({
      modules: [InfraestructureModule],
      adapters: {
        exchangeRepository: ExchangeRepositoryAdapter,
        exchangeRateRepository: ExchangeRateRepositoryAdapter,
        userRepository: UserRepositoryAdapter,
      },
    }),
  ],
})
export class AppModule {}
