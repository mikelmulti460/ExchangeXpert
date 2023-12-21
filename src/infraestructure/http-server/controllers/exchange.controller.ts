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
import {
  ExchangeFilter,
  ExchangeServiceFilter,
} from '../exceptions/exchange.exception';
import { Exchange } from '../../../core/exchange/domain/entities/Exchange';
import { ExchangeApplication } from '../../../core/exchange/application/ExchangeApplication';
import { ExchangeApplicationError } from '../../../core/exchange/shared/error/ExchangeApplication.error';
import { EXCHANGE_APPLICATION } from '../../../core/core.module';
import { AppResponse } from '../model/app.response';
import { CreateExchangeRequest } from '../model/create-exchange.request';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  ApiSuccessResponse,
  ApiErrorResponse,
} from '../custom-decorators/customApi.decorators';

@ApiTags('Exchange')
@Controller('/exchange')
@UseFilters(ExchangeFilter)
@UseFilters(ExchangeServiceFilter)
export class ExchangeController {
  constructor(
    @Inject(EXCHANGE_APPLICATION)
    private exchangeApplication: ExchangeApplication,
  ) {}

  @ApiSuccessResponse('The exchange has been successfully created.')
  @ApiErrorResponse('The exchange could not be created.')
  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async createExchange(
    @Body() request: CreateExchangeRequest,
  ): Promise<AppResponse> {
    try {
      const exchange: Exchange = await this.exchangeApplication.convert(
        request.sourceCurrency,
        request.targetCurrency,
        request.amount,
      );
      return {
        status: 201,
        message: 'The exchange has been successfully created.',
        data: exchange,
      };
    } catch (error) {
      throw new ExchangeApplicationError(error.message);
    }
  }

  @ApiSuccessResponse('The exchange has been successfully retrieved.')
  @ApiErrorResponse('The exchange could not be retrieved.')
  @Get('/operations/:id/')
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async findExchange(@Param() params: { id: number }): Promise<AppResponse> {
    const exchangeData = await this.exchangeApplication.findExchange(params.id);
    return {
      status: 200,
      message: 'The exchange has been successfully found.',
      data: exchangeData,
    };
  }
}
