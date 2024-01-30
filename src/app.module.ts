import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { Otp } from './otp/entites';
import { Store } from './store/entites';
import { Admin } from './admins/entites';
import { Users } from './users/entities';
import { Media } from './media/entities';
import { Order } from './order/entities';
import { Basket } from './basket/entities';
import { Product } from './product/entities';
import { Comment } from './comment/entities';
import { Category } from './category/entities';
import { Discount } from './discount/entities';
import { Promocode } from './promocode/entities';
import { BasketItem } from './basket-items/entities';
import { UserAddress } from './user_address/entities';
import { DiscountProduct } from './discount_product/entities';

import { OtpModule } from './otp/otp.module';
import { SmsModule } from './sms/sms.module';
import { UserModule } from './users/users.module';
import { MediaModule } from './media/media.module';
import { StoreModule } from './store/store.module';
import { OrderModule } from './order/order.module';
import { AdminModule } from './admins/admin.module';
import { BasketModule } from './basket/basket.module';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { DiscountModule } from './discount/discount.module';
import { PromocodeModule } from './promocode/promocode.module';
import { BasketItemsModule } from './basket-items/basket-items.module';
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
      entities: [
        Users,
        Otp,
        Admin,
        Media,
        Product,
        Category,
        Discount,
        Promocode,
        Basket,
        DiscountProduct,
        BasketItem,
        Store,
        Order,
        UserAddress,
        Comment,
      ],
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
    BasketItemsModule,
    DiscountProductModule,
    StoreModule,
    OrderModule,
    UserAddress,
    CommentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
