import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities';
import { Users } from '../../users/entities';

@Entity('comment')
export class Comment {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'name', description: 'Comment name' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({ example: 'email@example.com', description: 'Commenter email' })
  @Column({ type: 'text' })
  email: string;

  @ApiProperty({ example: 'This is a comment.', description: 'Comment text' })
  @Column({ type: 'text' })
  text: string;

  @ApiProperty({ example: 5, description: 'Rating of the comment' })
  @Column()
  rating: number;

  @ApiProperty({ example: true, description: 'Comment status' })
  @Column({ type: 'boolean' })
  is_active: boolean;

  // @ApiProperty({
  //   example: 1,
  //   description: 'User ID associated with the comment',
  // })
  // @Column()
  // user_id: number;

  // @ApiProperty({
  //   example: 1,
  //   description: 'Product ID associated with the comment',
  // })
  // @Column()
  // product_id: number;

  @OneToMany(() => Product, (product) => product.comment, { lazy: true })
  product: Product;

  @ManyToOne(() => Users, (user) => user.id, { lazy: true })
  user: Users;

  @ApiProperty({
    example: '2024-01-24T12:34:56.789Z',
    description: 'Creation date of the comment',
  })
  @CreateDateColumn()
  created_at: Date; // Creation date
}
