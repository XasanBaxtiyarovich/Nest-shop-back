import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { Basket } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Basket, Users])],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
