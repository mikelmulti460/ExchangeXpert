import { ApiProperty } from '@nestjs/swagger';

export class CreateExchangeRequest {
  @ApiProperty()
  sourceCurrency: string;
  @ApiProperty()
  targetCurrency: string;
  @ApiProperty()
  amount: number;
}
