import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Basket } from '../../basket/entities';
import { Product } from '../../product/entities';

export class UpdateBasketItemDto {
  @ApiProperty({ example: '1', description: 'Basket ID' })
  @IsNotEmpty()
  basket: Basket;

  @ApiProperty({ example: '1', description: 'Product ID' })
  @IsNotEmpty()
  product: Product;

  @ApiProperty({ example: '10', description: 'Quantity of products' })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: '11000', description: 'Total Price of products' })
  @IsNotEmpty()
  total_price: number;
}
