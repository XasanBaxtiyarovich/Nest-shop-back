import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

import { Product } from "../../product/entities";

export class CreateMediaDto {
    @ApiProperty({ example: 1, description: 'Product Primary key id'})
    @IsNotEmpty()
    product: Product;
}