import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Users } from '../../users/entities';
import { BasketItem } from '../../basket-items/entities';

@Entity('basket')
export class Basket {
  @ApiProperty({ example: '1', description: 'Unical ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Users, (user) => user.baskets)
  user: Users;

  @ApiProperty({ example: 'true', description: 'Basket status' })
  @Column({ default: false })
  status: boolean;

  @ApiProperty({ example: '2024-12-01', description: 'Created date' })
  @CreateDateColumn()
  created_at: string;

  @OneToMany(() => BasketItem, (basket_item) => basket_item.basket)
  basket_items: BasketItem[];
}