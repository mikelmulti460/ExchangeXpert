import { Module } from '@nestjs/common';
import { ExchangeController } from './controllers/exchange.controller';
// import { RootController } from "./controllers/root.controller";

@Module({
  controllers: [
    // RootController,
    ExchangeController,
  ],
})
export class HttpServerModule {}
