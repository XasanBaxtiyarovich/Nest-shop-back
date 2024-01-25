import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Category } from './entities';
import { FilesService } from '../files/files.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    private fileService: FilesService  
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto, image: any): Promise<Object> {
    const existingCategory = await this.categoryRepository.findOne({ where: { name: createCategoryDto.name } });

    if (existingCategory) {
      return {
        message: 'Category name already exists',
        status: HttpStatus.CONFLICT,
      };
    }

    const photo = await this.fileService.createFile(image);

    const newCategory = await this.categoryRepository.save({ ...createCategoryDto, photo });

    return {
      category: newCategory,
      status: HttpStatus.CREATED,
      message: 'Created successfully',
    };
  }

  async findAllCategories(): Promise<Object> {
    const categories = await this.categoryRepository.find();

    if (categories.length === 0) {
      return {
        message: 'Categories not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      categories,
      status: HttpStatus.OK,
    };
  }

  async findOneCategory(id: number): Promise<Object> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      return {
        message: 'Category not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      category,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: number): Promise<Category> {
    const [category] = await this.categoryRepository.findBy({ id });

    return category;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto, image: any): Promise<Object> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      return {
        message: 'Category not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    if (category.name !== updateCategoryDto.name) {
      const existingCategory = await this.categoryRepository.findOne({ where: { name: updateCategoryDto.name } });

      if (existingCategory) {
        return {
          message: 'Category name already exists',
          status: HttpStatus.CONFLICT,
        };
      }
    }

    const photo = await this.fileService.createFile(image);

    await this.categoryRepository.update(id, { ...updateCategoryDto, photo });

    const updatedCategory = await this.categoryRepository.findOne({ where: { id } });

    return {
      category: updatedCategory,
      status: HttpStatus.OK,
    };
  }

  async removeCategory(id: number): Promise<Object | Number> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      return {
        message: 'Category not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    await this.categoryRepository.delete({ id });

    return HttpStatus.OK;
  }
}
