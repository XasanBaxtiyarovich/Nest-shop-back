import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBasketItemDto {
  @ApiProperty({ example: '1', description: 'Basket ID' })
  @IsNotEmpty()
  basket_id: number;

  @ApiProperty({ example: '1', description: 'Product ID' })
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ example: '10', description: 'Quantity of products' })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: '11000', description: 'Total Price of products' })
  @IsNotEmpty()
  total_price: number;
}
