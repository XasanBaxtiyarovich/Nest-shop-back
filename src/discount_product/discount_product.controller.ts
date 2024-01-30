import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { DiscountProduct } from './entities';
import { DiscountProductService } from './discount_product.service';
import { CreateDiscountProductDto, UpdateDiscountProductDto } from './dto';

@ApiTags('discount product')
@Controller('discount-product')
export class DiscountProductController {
  constructor(private readonly discountProductService: DiscountProductService) {}

  @ApiOperation({summary: 'add discount product'})
  @ApiResponse({status: 201, type: DiscountProduct})
  @Post()
  createDiscountProduct(
    @Body() createDiscountProductDto: CreateDiscountProductDto
  ): Promise<Object> {
    return this.discountProductService.createDiscountProduct(createDiscountProductDto);
  }

  @ApiOperation({summary: 'find discount products'})
  @ApiResponse({status: 201, type: [DiscountProduct]})
  @Get()
  findAllDiscountProduct(): Promise<Object> {
    return this.discountProductService.findAllDiscountProduct();
  }

  @ApiOperation({summary: 'find one discount product'})
  @ApiResponse({status: 201, type: DiscountProduct})
  @Get(':id')
  findOneDiscountProduct(
    @Param('id') id: number
  ): Promise<Object> {
    return this.discountProductService.findOneDiscountProduct(id);
  }

  @ApiOperation({summary: 'update one discount product'})
  @ApiResponse({status: 201, type: DiscountProduct})
  @Put(':id')
  updateDiscountProduct(
    @Param('id') id: number, 
    @Body() updateDiscountProductDto: UpdateDiscountProductDto
  ): Promise<Object> {
    return this.discountProductService.updateDiscountProduct(id, updateDiscountProductDto);
  }

  @ApiOperation({summary: 'remove one discount product'})
  @ApiResponse({status: 201, type: DiscountProduct})
  @Delete(':id')
  removeDiscountProduct(
    @Param('id') id: number
  ): Promise<Object | Number> {
    return this.discountProductService.removeDiscountProduct(id);
  }
}