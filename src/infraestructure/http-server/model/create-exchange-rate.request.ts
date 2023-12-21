import { ApiProperty } from '@nestjs/swagger';

export class CreateRateExchangeRequest {
  @ApiProperty()
  sourceCurrency: string;
  @ApiProperty()
  targetCurrency: string;
  @ApiProperty()
  rate: number;
}
