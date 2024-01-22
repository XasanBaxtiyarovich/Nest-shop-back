import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Fruits', description: 'Category name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'This is Fruits category', description: 'About that category' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
