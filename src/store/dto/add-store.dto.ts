import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

import { Product } from "../../product/entities";

export class AddCountDto{
    @ApiProperty({ example: 1, description: 'Product Primary key id'})
    @IsNotEmpty()
    product: Product;

    @ApiProperty({ example: 1, description: 'Added count'})
    @IsNumber()
    @IsNotEmpty()
    count: number;
}