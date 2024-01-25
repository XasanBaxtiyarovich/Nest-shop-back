import { Injectable, HttpStatus, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Not, Repository} from 'typeorm';

import { CreateUserAddressDto } from './dto';
import { UpdateUserAddressDto } from './dto';
import { UserAddress } from './entities';

@Injectable()
export class UserAddressService {
    constructor(
        @InjectRepository(UserAddress)
        private readonly userAddressRepository: Repository<UserAddress>,
    ) {}

    async createUserAddress(createUserAddressDto: CreateUserAddressDto): Promise<{ userAddress: UserAddress; status: HttpStatus; message: string }> {
        const existingAddress = await this.userAddressRepository.findOne({
            where: { address_name: createUserAddressDto.address_name },
        });

        if (existingAddress) {
            throw new ConflictException('Address name already exists');
        }

        const newUserAddress = this.userAddressRepository.create(createUserAddressDto);
        const savedUserAddress = await this.userAddressRepository.save(newUserAddress);

        return {
            userAddress: savedUserAddress,
            status: HttpStatus.CREATED,
            message: 'User Address created successfully',
        };
    }

    async getAllUserAddresses(): Promise<{ userAddresses: UserAddress[]; status: HttpStatus }> {
        const userAddresses = await this.userAddressRepository.find();

        if (userAddresses.length === 0) {
            return {
                userAddresses,
                status: HttpStatus.NOT_FOUND,
            };
        }

        return {
            userAddresses,
            status: HttpStatus.OK,
        };
    }

    async getUserAddressById(id: number): Promise<{ userAddress: UserAddress; status: HttpStatus }> {
        const userAddress = await this.userAddressRepository.findOne({where: {id}});

        if (!userAddress) {
            throw new NotFoundException('User Address not found');
        }

        return {
            userAddress,
            status: HttpStatus.OK,
        };
    }

    async updateUserAddress(id: number, updateUserAddressDto: UpdateUserAddressDto): Promise<{ userAddress: UserAddress; status: HttpStatus; message: string }> {
        const userAddress = await this.userAddressRepository.findOne({where: {id}});

        if (!userAddress) {
            throw new NotFoundException('User Address not found');
        }

        const existingAddress = await this.userAddressRepository.findOne({
            where: { address_name: updateUserAddressDto.address_name, id: Not(id) },
        });

        if (existingAddress) {
            throw new ConflictException('Address name already exists');
        }

        await this.userAddressRepository.update(id, updateUserAddressDto);

        const updatedUserAddress = await this.userAddressRepository.findOne({where: {id}});

        return {
            userAddress: updatedUserAddress,
            status: HttpStatus.OK,
            message: 'User Address updated successfully',
        };
    }

    async removeUserAddress(id: number): Promise<{ status: HttpStatus; message: string }> {
        await this.getUserAddressById(id);

        await this.userAddressRepository.delete(id);

        return {
            status: HttpStatus.OK,
            message: 'User Address deleted successfully',
        };
    }
}
