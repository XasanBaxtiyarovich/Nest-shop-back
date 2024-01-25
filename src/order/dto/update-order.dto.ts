import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';
import {Users} from "../../users/entities";
import {Promocode} from "../../promocode/entities";
import {Basket} from "../../basket/entities";
import {UserAddress} from "../../user_address/entities";

export class UpdateOrderDto {
    @ApiProperty({ example: '+998123456789', description: 'Order phone number' })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ example: '2024-12-12T00:00:00Z', description: 'Order date' })
    @IsOptional()
    @IsDateString()
    order_date?: Date;

    @ApiProperty({ example: '2024-12-12T00:00:00Z', description: 'Comment created_at' })
    @IsOptional()
    @IsDateString()
    created_at?: Date;

    @ApiProperty({ example: true, description: 'Order status' })
    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @ApiProperty({ example: 'karta', description: 'Order payment type' })
    @IsOptional()
    @IsString()
    payment_type?: string;

    @ApiProperty({ example: 1, description: 'User Address primary key ID' })
    @IsOptional()
    @IsNumber()
    userAddress_id?: UserAddress;

    @ApiProperty({ example: 1, description: 'Basket primary key ID' })
    @IsOptional()
    @IsNumber()
    basket_id?: Basket;

    @ApiProperty({ example: 1, description: 'Promo Code primary key ID' })
    @IsOptional()
    @IsNumber()
    promo_code_id?: Promocode;

    @ApiProperty({ example: 1, description: 'User primary key ID' })
    @IsOptional()
    @IsNumber()
    user_id?: Users;
}
