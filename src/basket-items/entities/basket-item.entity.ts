import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Basket } from "../../basket/entities";
import { Product } from "../../product/entities";

@Entity({ name: 'basket_items' })
export class BasketItem {
  @ApiProperty({ example: '1', description: 'Unical ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Basket, (basket) => basket.basket_items )
  basket: Basket;
  
  @ManyToOne(() => Product, (product) => product.basket_items )
  product: Product;

  @ApiProperty({ example: '10', description: 'Quantity of products' })
  @Column()
  quantity: number;

  @ApiProperty({ example: '11000', description: 'Total Price of products' })
  @Column()
  total_price: number;
}
