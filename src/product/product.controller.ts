import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { Product } from './entities';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { CategoryService } from '../category/category.service';


@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private categoreService: CategoryService 
  ) {}

  @ApiOperation({summary: 'add product'})
  @ApiResponse({status: 201, type: Product})
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<Object> {
    const { categoryId } = createProductDto;
    const category = await this.categoreService.findOne(categoryId);

    return this.productService.createProduct(createProductDto, category);
  }

  @ApiOperation({summary: 'find active products'})
  @ApiResponse({status: 201, type: [Product]})
  @Get('active')
  findAllActiveProduct(): Promise<Object> {
    return this.productService.findAllActiveProduct();
  }

  @ApiOperation({summary: 'find not active products'})
  @ApiResponse({status: 201, type: [Product]})
  @Get('not-active')
  findAllNotActiveProduct(): Promise<Object> {
    return this.productService.findAllNotActiveProduct();
  }

  @ApiOperation({summary: 'find one active product'})
  @ApiResponse({status: 200, type: Product})
  @Get('active/:id')
  findOneActiveProduct(
    @Param('id') id: number
  ): Promise<Object> {
    return this.productService.findOneActiveProduct(id);
  }

  @ApiOperation({summary: 'find one not active product'})
  @ApiResponse({status: 200, type: Product})
  @Get('not-active/:id')
  findOneNotActiveProduct(
    @Param('id') id: number
  ): Promise<Object> {
    return this.productService.findOneNotActiveProduct(id);
  }

  @ApiOperation({summary: 'update one product'})
  @ApiResponse({status: 200, type: Product})
  @Put(':id')
  async updateProduct(
    @Param('id') id: number, 
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Object> {
    const { categoryId } = updateProductDto;
    const category = await this.categoreService.findOne(categoryId);

    return this.productService.updateProduct(id, updateProductDto, category);
  }

  @ApiOperation({summary: 'remove one product'})
  @ApiResponse({status: 200, type: Product})
  @Delete(':id')
  removeProduct(
    @Param('id') id: number
  ): Promise<Object | Number> {
    return this.productService.removeProduct(id);
  }

  @ApiOperation({summary: 'update active product'})
  @ApiResponse({status: 200, type: Product})
  @Get('actived-or-notactivated/:id')
  active(
    @Param('id') id: number
  ): Promise<Object> {
    return this.productService.active(id)
  }

  @ApiOperation({summary: 'searche product by name'})
  @ApiResponse({status: 200, type: Product})
  @Get('searche/:name')
  searche_product(
    @Param('name') name: string
  ): Promise<Object> {
    return this.productService.searche_product(name);
  }
}