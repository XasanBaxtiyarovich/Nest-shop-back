import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './entities';
import { FilesModule } from '../files/files.module';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Category, Product
      ]
    ),
    FilesModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
