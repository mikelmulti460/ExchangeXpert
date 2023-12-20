export class ExchangeRate {
  id: number;
  sourceCurrency: string;
  targetCurrency: string;
  rate: number;

  static create(
    sourceCurrency: string,
    targetCurrency: string,
    rate: number,
  ): ExchangeRate {
    const exchangeRate = new ExchangeRate();
    exchangeRate.sourceCurrency = sourceCurrency;
    exchangeRate.targetCurrency = targetCurrency;
    exchangeRate.rate = rate;
    return exchangeRate;
  }
}
