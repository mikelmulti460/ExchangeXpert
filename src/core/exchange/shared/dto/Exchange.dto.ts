export interface ExchangeDTO {
  exchangeId: number;
  sourceCurrency: string;
  targetCurrency: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
