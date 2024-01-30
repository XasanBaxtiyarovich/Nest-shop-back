import { ApiProperty } from "@nestjs/swagger";

export class UpdateDateDto{
    @ApiProperty({ example: 'John', description: 'User firstname' })
    firstname?: string;

    @ApiProperty({ example: 'Doe', description: 'User lastname' })
    lastname?: string;

    @ApiProperty({ example: 'Uzbekistan', description: 'User address' })
    address?: string;
}