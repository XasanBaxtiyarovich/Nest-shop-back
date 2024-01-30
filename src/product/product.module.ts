import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities';
import { Store } from '../store/entites';
import { Comment } from '../comment/entities';
import { Category } from '../category/entities';
import { ProductService } from './product.service';
import { FilesModule } from '../files/files.module';
import { BasketItem } from '../basket-items/entities';
import { ProductController } from './product.controller';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Product, Category, BasketItem, Comment, Store
      ]
    ),
    FilesModule
  ],
  controllers: [ProductController],
  providers: [ProductService, CategoryService ],
})
export class ProductModule {}
