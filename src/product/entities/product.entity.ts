import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../../category/entities";
import { BasketItem } from "../../basket-items/entities";
import { Comment } from "../../comment/entities";

@Entity('product')
export class Product {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'name', description: 'Product name' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({
    example: 'description in product',
    description: 'Product description',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: '12000', description: 'Product name' })
  @Column()
  price: number;

  @ApiProperty({ example: '12', description: 'Product total count' })
  @Column()
  total_count: number;

  @ApiProperty({ example: '12.01.2000', description: 'Manufacturing Date' })
  @Column({ type: 'text' })
  mfg: string;

  @ApiProperty({ example: '2-month', description: 'Product Life' })
  @Column({ type: 'text' })
  life: string;

  @ApiProperty({ example: '46000111222', description: 'Product QR code' })
  @Column({ type: 'text' })
  qr_code: string;

  @ApiProperty({ example: 'value', description: 'Product value' })
  @Column({ type: 'text' })
  value: string;

  @ApiProperty({ example: 'brand', description: 'Product brand' })
  @Column({ type: 'text' })
  brand: string;

  @ApiProperty({ example: 'rating', description: 'Product rating' })
  @Column({ default: 0 })
  rating: number;

  @ApiProperty({ example: 'kg', description: 'Product unit of masure' })
  @Column({ type: 'text' })
  unit_of_masure: string;

  @ApiProperty({ example: 'true', description: 'Product active' })
  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => BasketItem, (basket_item) => basket_item.product, {
    lazy: true,
  })
  basket_items: BasketItem[];

  @ManyToOne(() => Comment, (comment) => comment.product, { lazy: true })
  comment: Comment[];

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Updation date
}