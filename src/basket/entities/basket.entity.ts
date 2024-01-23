import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  status: boolean = false;

  @ApiProperty({ example: '2024-12-01', description: 'Created date' })
  created_at: string;

  
}