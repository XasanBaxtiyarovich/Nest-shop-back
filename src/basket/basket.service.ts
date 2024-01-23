import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Basket } from './entities';
import { CreateBasketDto } from './dto';


@Injectable()
export class BasketService {
  constructor( @InjectRepository(Basket) private basketRepository: Repository<Basket> ) {}

  async createBasket(createBasketDto: CreateBasketDto): Promise<Object> {
    const existingBasket = await this.basketRepository.findBy({ user: createBasketDto.user });

    if (existingBasket) {
      return {
        message: 'Basket already exists',
        state: HttpStatus.CONFLICT,
      };
    }

    const newBasket = await this.basketRepository.save({
      ...createBasketDto,
    });

    return {
      basket: newBasket,
      status: HttpStatus.CREATED,
      message: 'Created successfully',
    };
  }

  async findAllBasket(): Promise<Object> {
    const baskets = await this.basketRepository.find();

    if (baskets.length == 0) {
      return {
        message: 'Baskets not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      baskets,
      status: HttpStatus.OK,
    };
  }

  async findOneBasket(id: number): Promise<Object> {
    const basket = await this.basketRepository.findBy({ id });

    if (!basket) {
      return {
        message: 'Basket not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      basket,
      status: HttpStatus.OK,
    };
  }

  async removeBasket(id: number): Promise<Object | Number> {
    const Basket = await this.basketRepository.findBy({ id });

    if (!Basket) {
      return {
        message: 'Basket not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    await this.basketRepository.delete({ id });

    return HttpStatus.OK;
  }
}