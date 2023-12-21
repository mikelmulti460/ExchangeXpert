import { Exchange } from '../entities/Exchange';
import { ExchangeRepository } from '../ports/outbound/Exchange.repository';
import { ExchangeDomainService } from './ExchangeDomain.service';

it('should find an exchange by id using the repository', async () => {
  const mockRepository: ExchangeRepository = {
    findExchange: jest.fn().mockResolvedValueOnce({} as Exchange),
    convert: jest.fn(),
  };
  const service = new ExchangeDomainService(mockRepository);
  const exchangeId = 1;
  await service.findExchange(exchangeId);
  expect(mockRepository.findExchange).toHaveBeenCalledWith(exchangeId);
});

it('should convert currencies using the repository', async () => {
  const mockRepository: ExchangeRepository = {
    findExchange: jest.fn(),
    convert: jest.fn().mockResolvedValueOnce({} as Exchange),
  };
  const service = new ExchangeDomainService(mockRepository);
  const sourceCurrency = 'USD';
  const targetCurrency = 'EUR';
  const amount = 100;
  await service.convert(sourceCurrency, targetCurrency, amount);
  expect(mockRepository.convert).toHaveBeenCalledWith(
    sourceCurrency,
    targetCurrency,
    amount,
  );
});

it('should return null when finding an exchange by id', async () => {
  const mockRepository: ExchangeRepository = {
    findExchange: jest.fn().mockResolvedValueOnce(null),
    convert: jest.fn(),
  };
  const service = new ExchangeDomainService(mockRepository);
  const exchangeId = 1;
  const result = await service.findExchange(exchangeId);
  expect(result).toBeNull();
});

it('should throw an error when finding an exchange by id', async () => {
  const mockRepository: ExchangeRepository = {
    findExchange: jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to find exchange')),
    convert: jest.fn(),
  };
  const service = new ExchangeDomainService(mockRepository);
  const exchangeId = 1;
  await expect(service.findExchange(exchangeId)).rejects.toThrow(
    'Failed to find exchange',
  );
});
