import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { Discount } from './entities';
import { DiscountService } from './discount.service';
import { CreateDiscountDto, UpdateDiscountDto } from './dto';

@ApiTags('discount')
@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  // Add Discount
  @ApiOperation({summary: 'Add discount'})
  @ApiResponse({status: 201, type: Discount})
  @Post()
  createDiscount(
    @Body() createDiscountDto: CreateDiscountDto
  ): Promise<Object> {
    return this.discountService.createDiscount(createDiscountDto);
  }

  // Get All Discounts
  @ApiOperation({summary: 'Get all discounts'})
  @ApiResponse({status: 200, type: [ Discount ]})
  @Get()
  findAllDiscount(): Promise<Object> {
    return this.discountService.findAllDiscount();
  }

  // Get One Discount
  @ApiOperation({summary: 'Get One Discount'})
  @ApiResponse({status: 200, type: Discount })
  @Get(':id')
  findOneDiscount(
    @Param('id') id: string
  ): Promise<Object> {
    return this.discountService.findOneDiscount(+id);
  }

  // Update One Discount
  @ApiOperation({summary: 'Update One Discount'})
  @ApiResponse({status: 200, type: Discount })
  @Put(':id')
  updateDiscount(
    @Param('id') id: number, 
    @Body() updateDiscountDto: UpdateDiscountDto
  ): Promise<Object> {
    return this.discountService.updateDiscount(id, updateDiscountDto);
  }

  // Remove One Discount
  @ApiOperation({summary: 'Remove One Discount'})
  @ApiResponse({status: 200, type: Discount })
  @Delete(':id')
  removeDiscount(
    @Param('id') id: number
  ): Promise<Object | Number> {
    return this.discountService.removeDiscount(id);
  }
}