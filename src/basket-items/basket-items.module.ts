import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BasketItem } from './entities';
import { Basket } from '../basket/entities';
import { Product } from '../product/entities';
import { BasketItemsService } from './basket-items.service';
import { BasketItemsController } from './basket-items.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        BasketItem,
        Basket,
        Product
      ]
    )
  ],
  controllers: [BasketItemsController],
  providers: [BasketItemsService],
})
export class BasketItemsModule {}