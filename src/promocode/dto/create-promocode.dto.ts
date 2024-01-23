import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePromocodeDto {
  @ApiProperty({ example: 'WTASDD3', description: 'Promocode' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '10', description: 'percentage for Promocode' })
  @IsNotEmpty()
  @IsNumber()
  persentage: number;

  @ApiProperty({ description: 'User end date', example: '2024-12-31' })
  @IsNotEmpty()
  @IsString()
  end_date: string;
}
