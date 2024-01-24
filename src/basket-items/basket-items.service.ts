import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBasketItemDto } from './dto/create-basket-item.dto';
import { UpdateBasketItemDto } from './dto/update-basket-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketItem } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class BasketItemsService {
  constructor(
    @InjectRepository(BasketItem)
    private basketItemRepository: Repository<BasketItem>,
  ) {}

  async create(createBasketItemDto: CreateBasketItemDto): Promise<Object> {
    const newBasket = await this.basketItemRepository.save({
      ...createBasketItemDto,
    });

    return {
      basket: newBasket,
      status: HttpStatus.CREATED,
      message: 'Created successfully',
    };
  }

  async findAll(): Promise<Object> {
    const basketItems = await this.basketItemRepository.find();

    if (basketItems.length == 0) {
      return {
        message: 'No basket items',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      basketItems,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: number): Promise<Object> {
    const basketItem = await this.basketItemRepository.findBy({ id });

    if (!basketItem) {
      return {
        message: 'No basket item',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      basketItem,
      status: HttpStatus.OK,
    };
  }

  async remove(id: number): Promise<Object | String> {
    const basketItem = await this.basketItemRepository.findBy({ id });

    if (!basketItem) {
      return {
        message: 'Basket item not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    await this.basketItemRepository.delete({ id: id });

    return {
      message: 'Delete successfully',
      status: HttpStatus.OK,
    };
  }
}
