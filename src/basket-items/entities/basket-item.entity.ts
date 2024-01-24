import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Basket } from "../../basket/entities";

@Entity({ name: 'basket-items' })
export class BasketItem {
  @ApiProperty({ example: '1', description: 'Unical ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  basket_id: number;

  @Column()
  product_id: number;

  @ApiProperty({ example: '10', description: 'Quantity of products' })
  @Column()
  quantity: number;

  @ApiProperty({ example: '11000', description: 'Total Price of products' })
  @Column()
  total_price: number;
}
