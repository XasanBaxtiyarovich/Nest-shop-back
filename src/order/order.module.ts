import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './entities';
import {Users} from "../users/entities";
import {UserAddress} from "../user_address/entities";
import {Basket} from "../basket/entities";
import {Promocode} from "../promocode/entities";

@Module({
    imports: [TypeOrmModule.forFeature([Order, Users, UserAddress, Basket, Promocode])],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
