import { Injectable, HttpStatus, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { CreateOrderDto } from './dto';
import { UpdateOrderDto } from './dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async createOrder(createOrderDto: CreateOrderDto): Promise<{ order: Order; status: HttpStatus; message: string }> {
        const newOrder = this.orderRepository.create(createOrderDto);

        try {
            const savedOrder = await this.orderRepository.save(newOrder);

            return {
                order: savedOrder,
                status: HttpStatus.CREATED,
                message: 'Order created successfully',
            };
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Duplicate order entry');
            }
            throw error;
        }
    }

    async getAllOrders(): Promise<{ orders: Order[]; status: HttpStatus }> {
        const orders = await this.orderRepository.find();

        if (orders.length === 0) {
            return {
                orders,
                status: HttpStatus.NOT_FOUND,
            };
        }

        return {
            orders,
            status: HttpStatus.OK,
        };
    }

    async getOrderById(id: number): Promise<{ order: Order; status: HttpStatus }> {
        const order = await this.orderRepository.findOne({where: {id}});

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        return {
            order,
            status: HttpStatus.OK,
        };
    }

    async updateOrder(id: number, updateOrderDto: UpdateOrderDto): Promise<{ order: Order; status: HttpStatus; message: string }> {
        await this.getOrderById(id);

        try {
            await this.orderRepository.update(id, updateOrderDto);
            const updatedOrder = await this.orderRepository.findOne({where: {id}});

            return {
                order: updatedOrder,
                status: HttpStatus.OK,
                message: 'Order updated successfully',
            };
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Duplicate order entry');
            }
            throw error;
        }
    }

    async removeOrder(id: number): Promise<{ status: HttpStatus; message: string }> {
        await this.getOrderById(id);

        await this.orderRepository.delete(id);

        return {
            status: HttpStatus.OK,
            message: 'Order deleted successfully',
        };
    }
}
