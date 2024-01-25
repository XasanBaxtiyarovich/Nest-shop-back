import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn, OneToOne,
} from 'typeorm';
import { UserAddress } from '../../user_address/entities';
import { Basket } from '../../basket/entities';
import { Promocode } from '../../promocode/entities';
import { Users } from '../../users/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity('order')
export class Order {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: '+998123456789', description: 'Order phone number' })
    @Column({ type: 'text'})
    phone: string;

    @ApiProperty({ example: '2024-12-12T00:00:00Z', description: 'Order date' })
    @Column({ type: 'timestamp'})
    order_date: Date;

    @ApiProperty({ example: '2024-12-12T00:00:00Z', description: 'Comment created_at' })
    @Column({ type: 'timestamp'})
    created_at: Date;

    @ApiProperty({ example: true, description: 'Order status' })
    @Column({ type: 'boolean'})
    status: boolean;

    @ApiProperty({ example: 'karta', description: 'Order payment type' })
    @Column({ type: 'text'})
    payment_type: string;

    @ApiProperty({ example: 1, description: 'User Address ID' })
    @OneToOne(() => UserAddress)
    @JoinColumn()
    userAddress: UserAddress;

    @ApiProperty({ example: 1, description: 'Basket ID' })
    @OneToOne(() => Basket)
    @JoinColumn()
    basket: Basket;

    @ApiProperty({ example: 1, description: 'Promo Code ID' })
    @OneToOne(() => Basket)
    @JoinColumn()
    promocode: Promocode;

    @ApiProperty({ example: 1, description: 'User ID' })
    // @ManyToOne(() => Users, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => Users, (user) => user.orders, { lazy: true })
    user: Users;
}
