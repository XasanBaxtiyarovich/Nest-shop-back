import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities';
import { Category } from '../category/entities';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Product, Category
      ]
    )
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
