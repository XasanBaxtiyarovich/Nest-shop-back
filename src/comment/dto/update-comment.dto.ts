import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ example: 'name', description: 'Comment name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'email@example.com', description: 'Commenter email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'This is a comment.', description: 'Comment text' })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ example: 5, description: 'Rating of the comment' })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({ example: true, description: 'Comment status' })
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: 1,
    description: 'User ID associated with the comment',
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    example: 1,
    description: 'Product ID associated with the comment',
  })
  @IsNotEmpty()
  @IsNumber()
  product_id: number;
}
