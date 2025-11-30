import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'John',
  })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'johndoe123',
  })
  @IsOptional()
  @IsString()
  userName: string;

  @ApiProperty({
    example: 'johndoe123@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: '654321',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
