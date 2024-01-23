import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Users } from './users/entities/users.entities';
import {UserModule} from "./users/users.module"
import { OtpModule } from './otp/otp.module';
import { SmsModule } from './sms/sms.module';
import { Otp } from './otp/entites/create-otp.dto';
import { AdminModule } from './admins/admin.module';
import { Admin } from './admins/entites/admin.entites';

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
      entities: [Users,Otp,Admin],
      synchronize: true,
    }),
    UserModule,
    AdminModule,
    OtpModule,
    SmsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
