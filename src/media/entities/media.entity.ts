import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Product } from "../../product/entities";

@Entity('media')
export class Media {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ example: 1, description: 'Product Primary key id'})
    @OneToOne(() => Product)
    @JoinColumn()
    product: Product

    @ApiProperty({ example: 'media.jpg', description: 'Product media link'})
    @Column({type: 'text'})
    media_link: string; 
}