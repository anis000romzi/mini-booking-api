import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetAvailableRoomsDto {
  @ApiProperty({ required: true, example: '2025-12-01 00:00' })
  @IsNotEmpty()
  @IsString()
  startAt: string;

  @ApiProperty({ required: true, example: '2025-12-31 23:59' })
  @IsNotEmpty()
  @IsString()
  endAt: string;
}
