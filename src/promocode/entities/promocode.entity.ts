import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'promocode' })
export class Promocode {
  @ApiProperty({ example: '1', description: 'Unical ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'WTASDD3', description: 'Promocode' })
  @Column({ type: 'varchar', length: 15, nullable: false })
  name: string;

  @ApiProperty({ example: '10', description: 'percentage for Promocode' })
  @Column()
  persentage: number;

  @ApiProperty({ description: 'User end date', example: '2024-12-31' })
  @Column({ type: 'text' })
  end_date: string;
}
