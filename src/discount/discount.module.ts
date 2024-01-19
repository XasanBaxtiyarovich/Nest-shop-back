import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Discount } from './entities';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Discount
      ]
    )
  ],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}