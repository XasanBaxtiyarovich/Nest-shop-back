import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { Product } from './entities';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Add Product
  @ApiOperation({summary: 'Add product'})
  @ApiResponse({status: 201, type: Product})
  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<Object> {
    return this.productService.createProduct(createProductDto);
  }

  // Find all active products
  @ApiOperation({summary: 'Find all active products'})
  @ApiResponse({status: 201, type: [Product]})
  @Get('active')
  findAllActiveProduct(): Promise<Object> {
    return this.productService.findAllActiveProduct();
  }

  // Find all not active products
  @ApiOperation({summary: 'Find all not active products'})
  @ApiResponse({status: 201, type: [Product]})
  @Get('not-active')
  findAllNotActiveProduct(): Promise<Object> {
    return this.productService.findAllNotActiveProduct();
  }

  // Find one active product
  @ApiOperation({summary: 'Find one active product'})
  @ApiResponse({status: 200, type: Product})
  @Get('active/:id')
  findOneActiveProduct(
    @Param('id') id: number
  ): Promise<Object> {
    return this.productService.findOneActiveProduct(id);
  }

  // Find one not active product
  @ApiOperation({summary: 'Find one not active product'})
  @ApiResponse({status: 200, type: Product})
  @Get('not-active/:id')
  findOneNotActiveProduct(
    @Param('id') id: number
  ): Promise<Object> {
    return this.productService.findOneNotActiveProduct(id);
  }

  // Update one product
  @ApiOperation({summary: 'Update one product'})
  @ApiResponse({status: 200, type: Product})
  @Put(':id')
  updateProduct(
    @Param('id') id: number, 
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Object> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  // Remove one product
  @ApiOperation({summary: 'Remove one product'})
  @ApiResponse({status: 200, type: Product})
  @Delete(':id')
  removeProduct(
    @Param('id') id: number
  ): Promise<Object | Number> {
    return this.productService.removeProduct(id);
  }

  // Not Active or Active
  @ApiOperation({summary: 'Update active product'})
  @ApiResponse({status: 200, type: Product})
  @Get('actived-or-notactivated/:id')
  active(
    @Param('id') id: number
  ): Promise<Object> {
    return this.productService.active(id)
  }

  // Searche One Product By Name
  @ApiOperation({summary: 'Searche product'})
  @ApiResponse({status: 200, type: Product})
  @Get('searche/:name')
  searche_product(
    @Param('name') name: string
  ): Promise<Object> {
    return this.productService.searche_product(name);
  }
}