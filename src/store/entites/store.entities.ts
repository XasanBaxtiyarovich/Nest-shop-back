import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Product } from "../../product/entities";

@Entity('store')
export class Store {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Product, (product) => product.stories)
    product: Product;

    @ApiProperty({ example: 10, description: 'Count' })
    @Column()
    count: number;

    @CreateDateColumn()
    createt_at: Date;
}