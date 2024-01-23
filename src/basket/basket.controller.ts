import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Basket } from './entities';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';

@ApiTags('basket')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({ summary: 'Add Basket' })
  @ApiResponse({ status: 200, type: Basket })
  @Post()
  create(@Body() createDto: CreateBasketDto): Promise<String | Object> {
    return this.basketService.create(createDto);
  }

  @ApiOperation({ summary: 'Get All Baskets' })
  @ApiResponse({ status: 200, type: [Basket] })
  @Get()
  findAll(): Promise<Object> {
    return this.basketService.findAll();
  }

  @ApiOperation({ summary: 'Get One Basket ' })
  @ApiResponse({ status: 200, type: Basket })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Object> {
    return this.basketService.findOne(+id);
  }

  @ApiOperation({ summary: 'Delete One Basket' })
  @ApiResponse({ status: 200, type: Basket })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Object | Number> {
    return this.basketService.remove(+id);
  }
}
