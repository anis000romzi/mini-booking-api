import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    example: 'John',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  roomName: string;

  @ApiProperty({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  available: boolean;
}
