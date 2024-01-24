import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities';
import { Category } from '../category/entities';
import { ProductService } from './product.service';
import { BasketItem } from '../basket-items/entities';
import { ProductController } from './product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Product, Category, BasketItem
      ]
    )
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
