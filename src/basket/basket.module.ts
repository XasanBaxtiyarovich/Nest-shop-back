import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Basket } from './entities';
import { Users } from '../users/entities';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Basket,
        Users
      ]
    )
  ],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}