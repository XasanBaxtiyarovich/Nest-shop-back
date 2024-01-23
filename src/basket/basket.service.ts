import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-Basket.dto';
import { UpdateBasketDto } from './dto/update-Basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private basketRepository: Repository<Basket>,
  ) {}

  async create(createBasketDto: CreateBasketDto): Promise<Object> {
    const existingBasket = await this.basketRepository.findBy({
      user_id: createBasketDto.id,
    });

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

  async findAll(): Promise<Object> {
    const Baskets = await this.basketRepository.find();

    if (Baskets.length == 0) {
      return {
        message: 'Baskets not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      Baskets,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: number): Promise<Object> {
    const Basket = await this.basketRepository.findBy({ id });

    if (!Basket) {
      return {
        message: 'Basket not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      Basket,
      status: HttpStatus.OK,
    };
  }

  async remove(id: number): Promise<Object> {
    const Basket = await this.basketRepository.findBy({ id });

    if (!Basket) {
      return {
        message: 'Basket not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    await this.basketRepository.delete({ id: id });

    return {
      message: 'Delete successfully',
      status: HttpStatus.OK,
    };
  }
}
