import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import { Users } from '../../users/entities';

export class CreateUserAddressDto {
    @ApiProperty({ example: '1', description: 'User Primary key id' })
    @IsNumber()
    @IsNotEmpty()
    user: Users;

    @ApiProperty({ example: 'Toshkent', description: 'Address' })
    @IsNotEmpty()
    @IsString()
    address_name: string;

    @ApiProperty({ example: 'f23t3434t2vf', description: 'Location' })
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({ example: 'Shofayz', description: 'Street' })
    @IsNotEmpty()
    @IsString()
    street: string;

    @ApiProperty({ example: 'Chilanzar', description: 'Region' })
    @IsNotEmpty()
    @IsString()
    region: string;

    @ApiProperty({ example: '122', description: 'Home number' })
    @IsNotEmpty()
    @IsString()
    home_number: string;

    @ApiProperty({ example: '22', description: 'Flat number' })
    @IsNotEmpty()
    @IsString()
    flat_number: string;

    @ApiProperty({ example: '123', description: 'Entrance' })
    @IsNotEmpty()
    @IsString()
    entrance: string;

    @ApiProperty({ example: '3', description: 'Floor' })
    @IsNotEmpty()
    @IsString()
    floor: string;
}
