import { Basket } from './../basket/entities/basket.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBasketItemDto } from './dto/create-basket-item.dto';
import { UpdateBasketItemDto } from './dto/update-basket-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketItem } from './entities';
import { Repository } from 'typeorm';
import { Product } from '../product/entities';

@Injectable()
export class BasketItemsService {
  constructor(
    @InjectRepository(BasketItem) private basketItemRepository: Repository<BasketItem>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Basket) private basketRepository: Repository<Basket>
  ) {}

  async create(createBasketItemDto: CreateBasketItemDto, products: Product, baskets: Basket): Promise<Object> {
    const { quantity, total_price } = createBasketItemDto;

    const newBasket = await this.basketItemRepository.save({
      quantity,
      total_price,
      basket: baskets,
      product: products 
    });

    const basket1 = await this.basketItemRepository.findOne({ where: {id: newBasket.id}, relations: { product: true, basket: true }});

    return {
      status: HttpStatus.CREATED,
      basket1
    };
  }

  async findAll(): Promise<Object> {
    const basketItems = await this.basketItemRepository.find({ relations: { product: true, basket: true }});

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
    const basketItem = await this.basketItemRepository.findOne({ where: { id }, relations: { product: true, basket: true }});

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

  async update(id: number, updateBasketItemDto: UpdateBasketItemDto) {
    const [basket_item] = await this.basketItemRepository.findBy({ id });
    if (!basket_item) {
      return {
        message: 'Basket Item not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    const basketitem = await this.basketItemRepository.update(
      { id },
      { ...updateBasketItemDto },
    );

    const basketItem = await this.basketItemRepository.findOne({ where: { id }, relations: { product: true, basket: true }});

    return {
      discount: basketItem,
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


  findOneProduct (id: number): Promise<Product> {
    return this.productRepository.findOne({where: {id}});
  }

  findOneBasket (id: number): Promise<Basket> {
    return this.basketRepository.findOne({where: {id}});
  }
}
