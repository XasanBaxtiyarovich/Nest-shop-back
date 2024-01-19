import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDiscountDto {
    @ApiProperty({ example: 'name', description: 'Admin first name'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'username', description: 'Admin last name'})
    @IsNumber()
    @IsNotEmpty()
    persentage: number;

    @ApiProperty({ example: '2024-01-19T10:03:47.048Z', description: 'Discount start date'})
    @IsString()
    @IsNotEmpty()
    start_date: string;

    @ApiProperty({ example: '2024-01-19T10:03:47.048Z', description: 'Discount end date'})
    @IsString()
    @IsNotEmpty()
    end_date: string;
}
