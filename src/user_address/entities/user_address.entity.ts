import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Users} from "../../users/entities";

@Entity('userAddress' )
export class UserAddress {
    @ApiProperty({ example: '1', description: 'Unique ID' })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Users, (user) => user.userAddresses, {lazy: true})
    user: Users;

    @ApiProperty({ example: 'Toshkent', description: 'Address' })
    @Column({ type: 'text', nullable: false })
    address_name: string;

    @ApiProperty({ example: 'f23t3434t2vf', description: 'Location' })
    @Column({ type: 'text', nullable: false })
    location: string;

    @ApiProperty({ example: 'Shofayz', description: 'Street' })
    @Column({ type: 'text', nullable: false })
    street: string;

    @ApiProperty({ example: 'Chilanzar', description: 'Region' })
    @Column({ type: 'text', nullable: false })
    region: string;

    @ApiProperty({ example: '122', description: 'Home number' })
    @Column({ type: 'text', nullable: false })
    home_number: string;

    @ApiProperty({ example: '22', description: 'Flat number' })
    @Column({ type: 'text', nullable: false })
    flat_number: string;

    @ApiProperty({ example: '123', description: 'Entrance' })
    @Column({ type: 'text', nullable: false })
    entrance: string;

    @ApiProperty({ example: '3', description: 'Floor' })
    @Column({ type: 'text', nullable: false })
    floor: string;
}

