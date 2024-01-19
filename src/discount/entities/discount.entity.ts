import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discount')
export class Discount {
  @ApiProperty({example: 1, description: 'Unique ID'})
  @PrimaryGeneratedColumn('increment')
  discount_id: number;

  @ApiProperty({ example: 'name', description: 'Discount name'})
  @Column({type: 'text'})
  name: string;

  @ApiProperty({ example: '15', description: 'Discount persentage'})
  @Column()
  persentage: number;

  @ApiProperty({ example: '2024-01-19T10:03:47.048Z', description: 'Discount start date'})
  @Column()
  start_date: string;

  @ApiProperty({ example: '2024-02-19T10:03:47.048Z', description: 'Discount end date'})
  @Column()
  end_date: string;
}