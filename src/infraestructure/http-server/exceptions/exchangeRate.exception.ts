import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ExchangeRateServiceError } from '../../../core/exchange/shared/error/ExchangeRateService.error';

@Catch(ExchangeRateServiceError)
export class ExchangeRateFilter implements ExceptionFilter {
  catch(exception: ExchangeRateServiceError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    Logger.error(
      `ExchangeRateController (${request.method}) at {${request.path}} error: ${exception.message}`,
    );

    response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
