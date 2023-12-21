import { Module } from '@nestjs/common';
import { ExchangeController } from './controllers/exchange.controller';
// import { RootController } from './controllers/root.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from '../auth/services/auth.service';
import { UserController } from './controllers/user.controller';
import { ExchangeRateController } from './controllers/exchange-rate.controller';

@Module({
  controllers: [
    // RootController,
    ExchangeController,
    AuthController,
    UserController,
    ExchangeRateController,
  ],
  providers: [AuthService],
})
export class HttpServerModule {}
