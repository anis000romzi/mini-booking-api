import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetAvailableDatesDto {
  @ApiProperty({
    required: true,
    example: '93cd82f7-d0b7-4414-9d2e-404914fd3281',
  })
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @ApiProperty({ required: true, example: '2025-12-01 00:00' })
  @IsNotEmpty()
  @IsString()
  startAt: string;

  @ApiProperty({ required: true, example: '2025-12-31 23:59' })
  @IsNotEmpty()
  @IsString()
  endAt: string;
}
