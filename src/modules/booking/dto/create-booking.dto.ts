import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    required: true,
    example: '93cd82f7-d0b7-4414-9d2e-404914fd3281',
  })
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @ApiProperty({ required: true, example: '2025-12-10 10:00' })
  @IsNotEmpty()
  @IsString()
  startAt: string;

  @ApiProperty({ required: true, example: '2025-12-10 11:00' })
  @IsNotEmpty()
  @IsString()
  endAt: string;
}
