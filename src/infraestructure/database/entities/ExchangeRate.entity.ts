import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'exchange_rate',
})
export class ExchangeRateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'source_currency',
  })
  sourceCurrency: string;

  @Column({
    name: 'target_currency',
  })
  targetCurrency: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, default: 0 })
  rate: number;
}
