import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Users } from '../../users/entities';

@Entity({ name: 'basket' })
export class Basket {
  @ApiProperty({ example: '1', description: 'Unical ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 1, description: 'Baskets Primary key id' })
  @ManyToOne(() => Users, (user) => user.baskets)
  user: Users;

  @ApiProperty({ example: 'true', description: 'Basket status' })
  @Column({ default: false })
  status: boolean;

  @ApiProperty({ example: '2024-12-01', description: 'Created date' })
  @CreateDateColumn()
  created_at: string;
}