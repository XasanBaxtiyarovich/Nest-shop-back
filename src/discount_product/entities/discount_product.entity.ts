import { ApiProperty } from "@nestjs/swagger";
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Product } from "../../product/entities";
import { Discount } from "../../discount/entities";

@Entity('discount_product')
export class DiscountProduct {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ example: 1, description: 'Product Primary key id'})
    @OneToOne(() => Product)
    @JoinColumn()
    product: Product;

    @ApiProperty({ example: 1, description: 'Discount Primary key id'})
    @OneToOne(() => Discount)
    @JoinColumn()
    discount: Discount;
}