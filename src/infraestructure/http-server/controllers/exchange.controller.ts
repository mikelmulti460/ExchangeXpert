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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateExchangeFilter } from '../exceptions/exchange.exception';
import { Exchange } from '../../../core/exchange/domain/entities/Exchange';
import { ExchangeApplication } from '../../../core/exchange/application/ExchangeApplication';
import { ExchangeApplicationError } from '../../../core/exchange/shared/error/ExchangeApplication.error';
import { EXCHANGE_APPLICATION } from '../../../core/core.module';
import { AppResponse } from '../model/app.response';
import { CreateExchangeRequest } from '../model/create-exchange.request';
import { JwtAuthGuard } from 'src/infraestructure/auth/guards/jwt-auth.guard';

@ApiTags('Exchange')
@Controller('/exchange')
@UseFilters(CreateExchangeFilter)
export class ExchangeController {
  constructor(
    @Inject(EXCHANGE_APPLICATION)
    private exchangeApplication: ExchangeApplication,
  ) {}

  @ApiCreatedResponse({
    description: 'The exchange has been successfully created.',
    type: AppResponse,
  })
  @ApiBadRequestResponse({
    description: 'The exchange could not be created.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @Post()
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

  @ApiResponse({
    description: 'The exchange has been successfully found.',
    type: AppResponse,
  })
  @ApiBadRequestResponse({
    description: 'The exchange could not be found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'id', type: Number })
  @HttpCode(200)
  @Get('/operations/:id/')
  async findExchange(@Param() params: { id: number }): Promise<AppResponse> {
    const exchangeData = await this.exchangeApplication.findExchange(params.id);
    return {
      status: 200,
      message: 'The exchange has been successfully found.',
      data: exchangeData,
    };
  }

  @ApiResponse({
    description: 'ok',
    type: AppResponse,
  })
  @ApiBadRequestResponse({
    description: 'The exchange could not be found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @HttpCode(200)
  @Get('/rates/')
  async getAllExchangesRate(): Promise<AppResponse> {
    const exchangeRates = await this.exchangeApplication.getExchangeRates();
    return {
      status: 200,
      message: 'ok',
      data: exchangeRates,
    };
  }

  @ApiResponse({
    description: 'The exchange rate has been successfully found.',
    type: AppResponse,
  })
  @ApiBadRequestResponse({
    description: 'The exchange rate could not be found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'sourceCurrency', type: String })
  @ApiParam({ name: 'targetCurrency', type: String })
  @HttpCode(200)
  @Get('/rates/:sourceCurrency/:targetCurrency')
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

  @ApiResponse({
    description: 'The exchange rate has been successfully found.',
    type: AppResponse,
  })
  @ApiBadRequestResponse({
    description: 'The exchange could not be found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @HttpCode(200)
  @Get('/rates/:id/')
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
}
