import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBasketDto {
  @ApiProperty({ example: '1', description: 'User ID' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 'true', description: 'Basket Status' })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty({ example: '2024-12-01', description: 'Createrd Date' })
  @IsNotEmpty()
  @IsString()
  created_at: string;
}
