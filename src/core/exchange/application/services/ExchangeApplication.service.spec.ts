import { Exchange } from '../../domain/entities/Exchange';
import { ExchangeRate } from '../../domain/entities/ExchangeRate';
import { ExchangeService } from '../../domain/ports/inbound/ExchangeService';
import { ExchangeRateService } from '../../domain/ports/inbound/ExchangeRateService';
import { ExchangeApplicationService } from './ExchangeApplication.service';

describe('ExchangeApplicationService', () => {
  it('should find an exchange by ID when valid ID is provided', async () => {
    // Arrange
    const exchangeId = 1;
    const expectedExchange: Exchange = {
      exchangeId: exchangeId,
      sourceCurrency: 'USD',
      targetCurrency: 'EUR',
      rate: 0.85,
      amount: 100,
      convertedAmount: 85,
    };
    const exchangeRepositoryMock: ExchangeService = {
      findExchange: jest.fn().mockResolvedValue(expectedExchange),
      convert: jest.fn(),
    };
    const exchangeRateRepositoryMock: ExchangeRateService = {
      getExchangeRate: jest.fn(),
      getRate: jest.fn(),
      getExchangeRates: jest.fn(),
      getExchangeRateById: jest.fn(),
    };
    const exchangeApplicationService = new ExchangeApplicationService(
      exchangeRepositoryMock,
      exchangeRateRepositoryMock,
    );

    const result = await exchangeApplicationService.findExchange(exchangeId);

    expect(result).toEqual(expectedExchange);
    expect(exchangeRepositoryMock.findExchange).toHaveBeenCalledWith(
      exchangeId,
    );
  });

  it('should convert an amount from one currency to another when valid currencies and amount are provided', async () => {
    const sourceCurrency = 'USD';
    const targetCurrency = 'EUR';
    const amount = 100;
    const expectedExchange: Exchange = {
      exchangeId: 1,
      sourceCurrency: sourceCurrency,
      targetCurrency: targetCurrency,
      rate: 0.85,
      amount: amount,
      convertedAmount: 85,
    };
    const exchangeRepositoryMock: ExchangeService = {
      findExchange: jest.fn(),
      convert: jest.fn().mockResolvedValue(expectedExchange),
    };
    const exchangeRateRepositoryMock: ExchangeRateService = {
      getExchangeRate: jest.fn(),
      getRate: jest.fn(),
      getExchangeRates: jest.fn(),
      getExchangeRateById: jest.fn(),
    };
    const exchangeApplicationService = new ExchangeApplicationService(
      exchangeRepositoryMock,
      exchangeRateRepositoryMock,
    );

    const result = await exchangeApplicationService.convert(
      sourceCurrency,
      targetCurrency,
      amount,
    );

    expect(result).toEqual(expectedExchange);
    expect(exchangeRepositoryMock.convert).toHaveBeenCalledWith(
      sourceCurrency,
      targetCurrency,
      amount,
    );
  });

  // Can get the exchange rate between two currencies
  it('should get the exchange rate between two currencies when valid currencies are provided', async () => {
    // Arrange
    const sourceCurrency = 'USD';
    const targetCurrency = 'EUR';
    const expectedExchangeRate: ExchangeRate = {
      id: 1,
      sourceCurrency: sourceCurrency,
      targetCurrency: targetCurrency,
      rate: 0.85,
    };
    const exchangeRepositoryMock: ExchangeService = {
      findExchange: jest.fn(),
      convert: jest.fn(),
    };
    const exchangeRateRepositoryMock: ExchangeRateService = {
      getExchangeRate: jest.fn().mockResolvedValue(expectedExchangeRate),
      getRate: jest.fn(),
      getExchangeRates: jest.fn(),
      getExchangeRateById: jest.fn(),
    };
    const exchangeApplicationService = new ExchangeApplicationService(
      exchangeRepositoryMock,
      exchangeRateRepositoryMock,
    );

    const result = await exchangeApplicationService.getExchangeRate(
      sourceCurrency,
      targetCurrency,
    );

    expect(result).toEqual(expectedExchangeRate);
    expect(exchangeRateRepositoryMock.getExchangeRate).toHaveBeenCalledWith(
      sourceCurrency,
      targetCurrency,
    );
  });

  // Can get the exchange rate between two currencies
  it('should get the exchange rate between two currencies when valid currencies are provided', async () => {
    // Arrange
    const sourceCurrency = 'USD';
    const targetCurrency = 'EUR';
    const expectedRate = 0.85;
    const exchangeRepositoryMock: ExchangeService = {
      findExchange: jest.fn(),
      convert: jest.fn(),
    };
    const exchangeRateRepositoryMock: ExchangeRateService = {
      getExchangeRate: jest.fn(),
      getRate: jest.fn().mockResolvedValue(expectedRate),
      getExchangeRates: jest.fn(),
      getExchangeRateById: jest.fn(),
    };
    const exchangeApplicationService = new ExchangeApplicationService(
      exchangeRepositoryMock,
      exchangeRateRepositoryMock,
    );

    const result = await exchangeApplicationService.getRate(
      sourceCurrency,
      targetCurrency,
    );

    expect(result).toEqual(expectedRate);
    expect(exchangeRateRepositoryMock.getRate).toHaveBeenCalledWith(
      sourceCurrency,
      targetCurrency,
    );
  });
});
