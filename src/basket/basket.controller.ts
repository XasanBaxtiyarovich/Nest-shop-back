import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { Basket } from './entities';
import { CreateBasketDto } from './dto';
import { BasketService } from './basket.service';
import { Users } from '../users/entities';

@ApiTags('basket')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({ summary: 'add basket' })
  @ApiResponse({ status: 200, type: Basket })
  @Post()
  async createBasket(
    @Body() createDto: CreateBasketDto
  ): Promise<String | Object> {
    const user: Users = await this.basketService.findOneUser(+createDto.user);
    
    return this.basketService.createBasket(user);
  }

  @ApiOperation({ summary: 'Get All Baskets' })
  @ApiResponse({ status: 200, type: [Basket] })
  @Get()
  findAllBasket(): Promise<Object> {
    return this.basketService.findAllBasket();
  }

  @ApiOperation({ summary: 'Get One Basket' })
  @ApiResponse({ status: 200, type: Basket })
  @Get(':id')
  findOneBasket(
    @Param('id') id: number
  ): Promise<Object> {
    return this.basketService.findOneBasket(id);
  }

  @ApiOperation({ summary: 'Delete One Basket' })
  @ApiResponse({ status: 200, type: Basket })
  @Delete(':id')
  removeBasket(
    @Param('id') id: number
  ): Promise<Object | Number> {
    return this.basketService.removeBasket(id);
  }
}