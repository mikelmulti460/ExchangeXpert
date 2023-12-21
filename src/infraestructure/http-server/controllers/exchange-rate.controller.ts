import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  UseFilters,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ExchangeFilter } from '../exceptions/exchange.exception';
import { ExchangeRateFilter } from '../exceptions/exchangeRate.exception';
import { Exchange } from '../../../core/exchange/domain/entities/Exchange';
import { ExchangeApplication } from '../../../core/exchange/application/ExchangeApplication';
import { ExchangeApplicationError } from '../../../core/exchange/shared/error/ExchangeApplication.error';
import { EXCHANGE_APPLICATION } from '../../../core/core.module';
import { AppResponse } from '../model/app.response';
import { CreateRateExchangeRequest } from '../model/create-exchange-rate.request';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  ApiSuccessResponse,
  ApiErrorResponse,
} from '../custom-decorators/customApi.decorators';

@ApiTags('Exchange Rate')
@Controller('/exchange-rate')
@UseFilters(ExchangeFilter)
@UseFilters(ExchangeRateFilter)
export class ExchangeRateController {
  constructor(
    @Inject(EXCHANGE_APPLICATION)
    private exchangeApplication: ExchangeApplication,
  ) {}

  @ApiSuccessResponse('The exchange rates has been successfully retrieved.')
  @ApiErrorResponse('The exchange rate could not be retrieved.')
  @Get('/')
  @HttpCode(200)
  async getAllExchangesRate(): Promise<AppResponse> {
    const exchangeRates = await this.exchangeApplication.getExchangeRates();
    return {
      status: 200,
      message: 'ok',
      data: exchangeRates,
    };
  }

  @ApiSuccessResponse('The exchange rate has been successfully found.')
  @ApiErrorResponse('The exchange could not be found.')
  @Get('/:sourceCurrency/:targetCurrency')
  @ApiParam({ name: 'sourceCurrency', type: String })
  @ApiParam({ name: 'targetCurrency', type: String })
  @HttpCode(200)
  async getExchangeRate(
    @Param() params: { sourceCurrency: string; targetCurrency: string },
  ): Promise<AppResponse> {
    const exchangeRate = await this.exchangeApplication.getExchangeRate(
      params.sourceCurrency,
      params.targetCurrency,
    );
    return {
      status: 200,
      message: 'The exchange rate has been successfully found.',
      data: exchangeRate,
    };
  }

  @ApiSuccessResponse('The exchange rate has been successfully found.')
  @ApiErrorResponse('The exchange rate could not be found.')
  @Get('/:id/')
  @HttpCode(200)
  async getExchangeRateById(
    @Param() params: { id: number },
  ): Promise<AppResponse> {
    const exchangeRate = await this.exchangeApplication.getExchangeRateById(
      params.id,
    );
    return {
      status: 200,
      message: 'The exchange rate has been successfully found.',
      data: exchangeRate,
    };
  }

  @ApiSuccessResponse('The exchange has rate been successfully created.')
  @ApiErrorResponse('The exchange rate could not be created.')
  @Post('/')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async createExchangeRate(
    @Body() request: CreateRateExchangeRequest,
  ): Promise<AppResponse> {
    try {
      const exchangeRate: Exchange =
        await this.exchangeApplication.setExchangeRate(
          request.sourceCurrency,
          request.targetCurrency,
          request.rate,
        );
      return {
        status: 201,
        message: 'The exchange rate has been successfully created.',
        data: exchangeRate,
      };
    } catch (error) {
      throw new ExchangeApplicationError(error.message);
    }
  }
}
