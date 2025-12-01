import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { QueryDto } from 'src/commons/dto/query.dto';

export class QueryBookingDto extends QueryDto {
  @ApiProperty({
    required: false,
    default: 'id',
    description: 'Sorting column id',
  })
  @IsString()
  @IsOptional()
  orderBy?: string = 'id';
}
