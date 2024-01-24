import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiscountProduct } from './entities';
import { Product } from '../product/entities';
import { Discount } from '../discount/entities';
import { DiscountProductService } from './discount_product.service';
import { DiscountProductController } from './discount_product.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        DiscountProduct,
        Discount, 
        Product
      ]
    )
  ],
  controllers: [DiscountProductController],
  providers: [DiscountProductService],
})
export class DiscountProductModule {}