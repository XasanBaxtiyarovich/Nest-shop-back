import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus, NotFoundException, ConflictException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAddressService } from './user_address.service';
import { CreateUserAddressDto } from './dto';
import { UpdateUserAddressDto } from './dto';

@ApiTags('User Address')
@Controller('user-address')
export class UserAddressController {
    constructor(private readonly userAddressService: UserAddressService) {}

    @ApiOperation({ summary: 'Create User Address' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'User Address created successfully' })
    @Post('create')
    async createUserAddress(@Body() createUserAddressDto: CreateUserAddressDto): Promise<{ userAddress: any; status: HttpStatus; message: string }> {
        try {
            const result = await this.userAddressService.createUserAddress(createUserAddressDto);
            return result;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new ConflictException(error.message);
            }
            throw error;
        }
    }

    @ApiOperation({ summary: 'Get All User Addresses' })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of User Addresses' })
    @Get('all')
    async getAllUserAddresses(): Promise<{ userAddresses: any[]; status: HttpStatus }> {
        return this.userAddressService.getAllUserAddresses();
    }

    @ApiOperation({ summary: 'Get User Address by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User Address found' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User Address not found' })
    @Get(':id')
    async getUserAddressById(@Param('id') id: string): Promise<{ userAddress: any; status: HttpStatus }> {
        try {
            const result = await this.userAddressService.getUserAddressById(+id);
            return result;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }

    @ApiOperation({ summary: 'Update User Address' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User Address updated successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User Address not found' })
    @Put(':id')
    async updateUserAddress(@Param('id') id: string, @Body() updateUserAddressDto: UpdateUserAddressDto): Promise<{ userAddress: any; status: HttpStatus; message: string }> {
        try {
            const result = await this.userAddressService.updateUserAddress(+id, updateUserAddressDto);
            return result;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            } else if (error instanceof ConflictException) {
                throw new ConflictException(error.message);
            }
            throw error;
        }
    }

    @ApiOperation({ summary: 'Remove User Address' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User Address removed successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User Address not found' })
    @Delete(':id')
    async removeUserAddress(@Param('id') id: string): Promise<{ status: HttpStatus; message: string }> {
        try {
            const result = await this.userAddressService.removeUserAddress(+id);
            return result;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }
}
