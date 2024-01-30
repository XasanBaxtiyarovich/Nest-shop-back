import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BasketItemsService } from './basket-items.service';
import { CreateBasketItemDto } from './dto/create-basket-item.dto';
import { UpdateBasketItemDto } from './dto/update-basket-item.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BasketItem } from './entities';
import { Product } from '../product/entities';
import { Basket } from '../basket/entities';

@ApiTags('basket-items')
@Controller('basket-items')
export class BasketItemsController {
  constructor(private readonly basketItemsService: BasketItemsService) {}

  @ApiOperation({ summary: 'Add basket-item' })
  @ApiResponse({ status: 201, type: BasketItem })
  @Post()
  async create(
    @Body() createBasketItemDto: CreateBasketItemDto
  ): Promise<Object> {
    const product: Product = await this.basketItemsService.findOneProduct(+createBasketItemDto.product);
    const basket: Basket = await this.basketItemsService.findOneBasket(+createBasketItemDto.basket);

    return this.basketItemsService.create(createBasketItemDto, product, basket);
  }

  @ApiOperation({ summary: 'Get all basket items' })
  @ApiResponse({ status: 200, type: [BasketItem] })
  @Get()
  findAll(): Promise<Object> {
    return this.basketItemsService.findAll();
  }

  @ApiOperation({ summary: 'Get one basket item' })
  @ApiResponse({ status: 200, type: BasketItem })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Object> {
    return this.basketItemsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update One Basket item' })
  @ApiResponse({ status: 200, type: BasketItem })
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateBasketItemDto: UpdateBasketItemDto,
  ): Promise<Object> {
    return this.basketItemsService.update(id, updateBasketItemDto);
  }

  @ApiOperation({ summary: 'Delete one basket item' })
  @ApiResponse({ status: 200, type: BasketItem })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Object | Number> {
    return this.basketItemsService.remove(+id);
  }
}
