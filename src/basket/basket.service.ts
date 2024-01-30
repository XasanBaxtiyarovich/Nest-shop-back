import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Basket } from './entities';
import { CreateBasketDto } from './dto';
import { Users } from '../users/entities';


@Injectable()
export class BasketService {
  constructor( 
    @InjectRepository(Basket) private basketRepository: Repository<Basket>,
    @InjectRepository(Users) private userRepository: Repository<Users> 
  ) {}

  async createBasket(users: Users): Promise<Object> {
    const newBasket = await this.basketRepository.save({
      user: users,
    });

    return {
      basket: newBasket,
      status: HttpStatus.CREATED,
      message: 'Created successfully',
    };
  }

  async findAllBasket(): Promise<Object> {
    const baskets = await this.basketRepository.find({ relations: { user: true } });

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
    const basket = await this.basketRepository.findOne({ where: { id }, relations: { user: true }});

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


  findOneUser (id: number): Promise<Users> {
    return this.userRepository.findOne({ where: { id } });
  }
}