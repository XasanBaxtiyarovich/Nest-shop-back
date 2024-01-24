import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { Otp } from './otp/entites';
import { Admin } from './admins/entites';
import { Users } from './users/entities';
import { Media } from './media/entities';
import { Basket } from './basket/entities';
import { Product } from './product/entities';
import { Category } from "./category/entities";
import { Discount } from './discount/entities';
import { Promocode } from './promocode/entities';
import { DiscountProduct } from './discount_product/entities';

import { OtpModule } from './otp/otp.module';
import { SmsModule } from './sms/sms.module';
import { UserModule } from "./users/users.module"
import { MediaModule } from './media/media.module';
import { AdminModule } from './admins/admin.module';
import { BasketModule } from './basket/basket.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from "./category/category.module";
import { DiscountModule } from './discount/discount.module';
import { PromocodeModule } from './promocode/promocode.module';
import { DiscountProductModule } from './discount_product/discount_product.module';


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
      entities: [ Users, Otp, Admin, Media, Product, Category, Discount, Promocode, Basket, DiscountProduct ],
      synchronize: true,
    }),
    UserModule,
    AdminModule,
    OtpModule,
    SmsModule,
    MediaModule,
    ProductModule,
    CategoryModule,
    DiscountModule,
    PromocodeModule,
    BasketModule,
    DiscountProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}