import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities";

@Entity('store')
export class Store {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1, description: 'Product Primary key id'})
    @OneToOne(() => Product)
    @JoinColumn()
    product: Product

    @ApiProperty({ example: 10, description: 'Count' })
    @Column()
    count: number;

    @CreateDateColumn()
    createt_at: Date;
}