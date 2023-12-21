import { Module } from '@nestjs/common';
import { ExchangeController } from './controllers/exchange.controller';
// import { RootController } from './controllers/root.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from '../auth/services/auth.service';

@Module({
  controllers: [
    // RootController,
    ExchangeController,
    AuthController,
  ],
  providers: [AuthService],
})
export class HttpServerModule {}
