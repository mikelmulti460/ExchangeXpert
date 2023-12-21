import { ExchangeRateRepository } from '../ports/outbound/ExchangeRate.repository';
import { ExchangeRateDomainService } from './ExchangeRateDomain.service';
import { ExchangeRate } from '../entities/ExchangeRate';

it('should return the exchange rate when given the source and target currency', async () => {
  const mockRepository: ExchangeRateRepository = {
    getExchangeRate: jest
      .fn()
      .mockResolvedValue(ExchangeRate.create('USD', 'EUR', 0.85)),
    getRate: jest.fn(),
    getExchangeRates: jest.fn(),
    getExchangeRateById: jest.fn(),
  };
  const service = new ExchangeRateDomainService(mockRepository);
  const sourceCurrency = 'USD';
  const targetCurrency = 'EUR';
  const exchangeRate = await service.getExchangeRate(
    sourceCurrency,
    targetCurrency,
  );
  expect(exchangeRate).toEqual(ExchangeRate.create('USD', 'EUR', 0.85));
  expect(mockRepository.getExchangeRate).toHaveBeenCalledWith(
    sourceCurrency,
    targetCurrency,
  );
});

it('should return the exchange rate when given the source and target currency', async () => {
  const mockRepository: ExchangeRateRepository = {
    getExchangeRate: jest.fn(),
    getRate: jest.fn().mockResolvedValue(0.85),
    getExchangeRates: jest.fn(),
    getExchangeRateById: jest.fn(),
  };
  const service = new ExchangeRateDomainService(mockRepository);
  const sourceCurrency = 'USD';
  const targetCurrency = 'EUR';
  const rate = await service.getRate(sourceCurrency, targetCurrency);
  expect(rate).toEqual(0.85);
  expect(mockRepository.getRate).toHaveBeenCalledWith(
    sourceCurrency,
    targetCurrency,
  );
});

it('should return the exchange rates', async () => {
  const mockRepository: ExchangeRateRepository = {
    getExchangeRate: jest.fn(),
    getRate: jest.fn(),
    getExchangeRates: jest
      .fn()
      .mockResolvedValue([ExchangeRate.create('USD', 'EUR', 0.85)]),
    getExchangeRateById: jest.fn(),
  };
  const service = new ExchangeRateDomainService(mockRepository);
  const exchangeRates = await service.getExchangeRates();
  expect(exchangeRates).toEqual([ExchangeRate.create('USD', 'EUR', 0.85)]);
  expect(mockRepository.getExchangeRates).toHaveBeenCalled();
});

it('should return the exchange rate when given the id', async () => {
  const mockRepository: ExchangeRateRepository = {
    getExchangeRate: jest.fn(),
    getRate: jest.fn(),
    getExchangeRates: jest.fn(),
    getExchangeRateById: jest
      .fn()
      .mockResolvedValue(ExchangeRate.create('USD', 'EUR', 0.85)),
  };
  const service = new ExchangeRateDomainService(mockRepository);
  const id = 1;
  const exchangeRate = await service.getExchangeRateById(id);
  expect(exchangeRate).toEqual(ExchangeRate.create('USD', 'EUR', 0.85));
  expect(mockRepository.getExchangeRateById).toHaveBeenCalledWith(id);
});
