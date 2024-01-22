import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { Media } from './media/entities';
import { Product } from './product/entities';
import { Category } from "./category/entities";
import { Discount } from './discount/entities';
import { Promocode } from './promocode/entities';

import { MediaModule } from './media/media.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from "./category/category.module";
import { DiscountModule } from './discount/discount.module';
import { PromocodeModule } from './promocode/promocode.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Discount, Category, Product, Promocode, Media],
      synchronize: true,
    }),

    DiscountModule,
    CategoryModule,
    ProductModule,
    PromocodeModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
