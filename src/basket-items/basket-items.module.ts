import { Module } from '@nestjs/common';
import { BasketItemsService } from './basket-items.service';
import { BasketItemsController } from './basket-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketItem } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([BasketItem])],
  controllers: [BasketItemsController],
  providers: [BasketItemsService],
})
export class BasketItemsModule {}
