import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';

import { Category } from './entities';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Add category' })
  @ApiResponse({ status: 201, type: Category })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createCategory(
      @Body() createCategoryDto: CreateCategoryDto,
      @UploadedFile() image: any
  ): Promise<Object> {
    return this.categoryService.createCategory(createCategoryDto, image);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  findAllCategories(): Promise<Object> {
    return this.categoryService.findAllCategories();
  }

  @ApiOperation({ summary: 'Get One Category' })
  @ApiResponse({ status: 200, type: Category })
  @Get(':id')
  findOneCategory(
      @Param('id') id: string,
  ): Promise<Object> {
    return this.categoryService.findOneCategory(+id);
  }

  @ApiOperation({ summary: 'Update One Category' })
  @ApiResponse({ status: 200, type: Category })
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  updateCategory(
      @Param('id') id: number,
      @Body() updateCategoryDto: UpdateCategoryDto,
      @UploadedFile() image: any
  ): Promise<Object> {
    return this.categoryService.updateCategory(id, updateCategoryDto, image);
  }

  @ApiOperation({ summary: 'Remove One Category' })
  @ApiResponse({ status: 200, type: Category })
  @Delete(':id')
  removeCategory(
      @Param('id') id: number,
  ): Promise<Object | Number> {
    return this.categoryService.removeCategory(id);
  }
}