import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'exchange',
})
export class ExchangeEntity {
  @PrimaryGeneratedColumn({
    name: 'exchange_id',
  })
  exchangeId: number;

  @Column({
    name: 'source_currency',
  })
  sourceCurrency: string;

  @Column({
    name: 'target_currency',
  })
  targetCurrency: string;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 10,
    scale: 6,
    default: 0,
  })
  amount: number;

  @Column({
    name: 'converted_amount',
    type: 'decimal',
    precision: 10,
    scale: 6,
    default: 0,
  })
  convertedAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, default: 0 })
  rate: number;
}
