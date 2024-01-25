import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsDateString, IsNumber } from 'class-validator';
import {Users} from "../../users/entities";
import {Promocode} from "../../promocode/entities";
import {Basket} from "../../basket/entities";
import {UserAddress} from "../../user_address/entities";

export class CreateOrderDto {
    @ApiProperty({ example: '+998123456789', description: 'Order phone number' })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({ example: '2024-12-12T00:00:00Z', description: 'Order date' })
    @IsNotEmpty()
    @IsDateString()
    order_date: Date;

    @ApiProperty({ example: '2024-12-12T00:00:00Z', description: 'Comment created_at' })
    @IsNotEmpty()
    @IsDateString()
    created_at: Date;

    @ApiProperty({ example: true, description: 'Order status' })
    @IsNotEmpty()
    @IsBoolean()
    status: boolean;

    @ApiProperty({ example: 'karta', description: 'Order payment type' })
    @IsNotEmpty()
    @IsString()
    payment_type: string;

    @ApiProperty({ example: 1, description: 'User Address primary key ID' })
    @IsNotEmpty()
    @IsNumber()
    userAddress_id: UserAddress;

    @ApiProperty({ example: 1, description: 'Basket primary key ID' })
    @IsNotEmpty()
    @IsNumber()
    basket_id: Basket;

    @ApiProperty({ example: 1, description: 'Promo Code primary key ID' })
    @IsNotEmpty()
    @IsNumber()
    promo_code_id: Promocode;

    @ApiProperty({ example: 1, description: 'User primary key ID' })
    @IsNotEmpty()
    @IsNumber()
    user_id: Users;
}
