import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { Op } from 'sequelize';
import { QueryDto } from 'src/commons/dto/query.dto';

export class QueryRoomDto extends QueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => ({ [Op.iLike]: `%${value}%` }))
  roomName: string;

  @ApiProperty({
    required: false,
    default: 'id',
    description: 'Sorting column id',
  })
  @IsString()
  @IsOptional()
  orderBy?: string = 'id';
}
