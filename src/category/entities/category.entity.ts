import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Product } from '../../product/entities/product.entity';

@Entity({ name: 'category' })
export class Category {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'Fruits', description: 'Category name' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ApiProperty({ example: 'image.jpg', description: 'Category`s image' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  photo: string;

  @ApiProperty({ example: 'This is red apple', description: 'About category' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
