import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @ApiProperty({
    example: 1,
    required: false,
    default: 1,
    description: 'Page number',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    example: 100,
    required: false,
    default: 100,
    description: 'Limit page',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  limit?: number = 100;

  @ApiProperty({
    required: false,
    default: 'desc',
    description: 'Sorting column order (asc, desc)',
    enum: ['asc', 'desc'],
  })
  @IsString()
  @IsOptional()
  order?: string = 'asc';

  @ApiProperty({
    example: 'id',
    required: false,
    default: 'id',
    description: 'Sorting column id',
  })
  @IsString()
  @IsOptional()
  orderBy?: string = 'id';
}
