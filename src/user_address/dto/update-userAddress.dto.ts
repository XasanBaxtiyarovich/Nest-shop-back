import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString, IsOptional} from 'class-validator';
import { Users } from '../../users/entities';

export class UpdateUserAddressDto {
    @ApiProperty({ example: '1', description: 'User Primary key id' })
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    user?: Users;

    @ApiProperty({ example: 'Toshkent', description: 'Address' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    address_name?: string;

    @ApiProperty({ example: 'f23t3434t2vf', description: 'Location' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    location?: string;

    @ApiProperty({ example: 'Shofayz', description: 'Street' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    street?: string;

    @ApiProperty({ example: 'Chilanzar', description: 'Region' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    region?: string;

    @ApiProperty({ example: '122', description: 'Home number' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    home_number?: string;

    @ApiProperty({ example: '22', description: 'Flat number' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    flat_number?: string;

    @ApiProperty({ example: '123', description: 'Entrance' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    entrance?: string;

    @ApiProperty({ example: '3', description: 'Floor' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    floor?: string;
}
