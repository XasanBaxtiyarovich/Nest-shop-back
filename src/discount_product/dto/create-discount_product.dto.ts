import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

import { Product } from "../../product/entities";
import { Discount } from "../../discount/entities";

export class CreateDiscountProductDto {
    @ApiProperty({ example: 1, description: 'Product Primary key id'})
    @IsNumber()
    @IsNotEmpty()
    product: Product;

    @ApiProperty({ example: 1, description: 'Discount Primary key id'})
    @IsNumber()
    @IsNotEmpty()
    discount: Discount;
}