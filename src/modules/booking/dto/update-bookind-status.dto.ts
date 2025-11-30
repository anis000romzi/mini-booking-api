import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateBookingStatusDto {
  @ApiProperty({ required: true, example: 'done' })
  @IsNotEmpty()
  @IsEnum(['booked', 'done', 'cancelled'] as const)
  status: 'booked' | 'done' | 'cancelled';
}
