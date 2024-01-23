import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

import { Category } from "../../category/entities";

export class CreateProductDto {
    @ApiProperty({ example: 'name', description: 'Product name'})
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({ example: 'description in product', description: 'Product description'})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: '12000', description: 'Product name'})
    @IsNumber()
    @IsNotEmpty()
    price: number;
  
    @ApiProperty({ example: '12', description: 'Product total count'})
    @IsNumber()
    @IsNotEmpty()
    total_count: number;

    @ApiProperty({ example: '12.01.2000', description: 'Manufacturing Date'})
    @IsString()
    @IsNotEmpty()
    mfg: string;    

    @ApiProperty({ example: '2-month', description: 'Product Life'})
    @IsString()
    @IsNotEmpty()
    life: string;    

    @ApiProperty({ example: '46000111222', description: 'Product QR code'})
    @IsString()
    @IsNotEmpty()
    qr_code: string;    

    @ApiProperty({ example: 'value', description: 'Product value'})
    @IsString()
    @IsNotEmpty()
    value: string;   

    @ApiProperty({ example: 'brand', description: 'Product brand'})
    @IsString()
    @IsNotEmpty()
    brand: string;   

    @ApiProperty({ example: 'rating', description: 'Product rating'})
    @IsNumber()
    @IsNotEmpty()
    rating: number;   

    @ApiProperty({ example: 'kg', description: 'Product unit of masure'})
    @IsString()
    @IsNotEmpty()
    unit_of_masure: string;

    @ApiProperty({ example: '1', description: 'Product primary key category id'})
    @IsNumber()
    @IsNotEmpty()
    category: Category
}