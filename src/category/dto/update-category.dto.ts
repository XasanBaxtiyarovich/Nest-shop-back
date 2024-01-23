import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCategoryDto {
    @ApiProperty({ example: 'name', description: 'Admin first name'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'This is Clothes category', description: 'About that category' })
    @IsString()
    @IsNotEmpty()
    description: string;
}