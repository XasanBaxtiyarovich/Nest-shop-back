import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { DiscountProduct } from './entities';
import { CreateDiscountProductDto, UpdateDiscountProductDto } from './dto';

@Injectable()
export class DiscountProductService {
  constructor(@InjectRepository(DiscountProduct) private discountProductRepository: Repository<DiscountProduct> ){}

  async createDiscountProduct(createDiscountProductDto: CreateDiscountProductDto): Promise<Object> {
    const discount_product = await this.discountProductRepository.findBy(
      { 
        product: createDiscountProductDto.product, 
        discount: createDiscountProductDto.discount
      }
    );

    if (discount_product) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Product Aleardy Discounted'
      }
    }

    const new_dicount_product = await this.discountProductRepository.save({ ...createDiscountProductDto });

    return {
      status: HttpStatus.CREATED,
      discount_product: new_dicount_product
    };
  }

  async findAllDiscountProduct(): Promise<Object> {
    const discount_products = await this.discountProductRepository.find();

    if (discount_products.length === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Discount Products Not Found'
      }
    }

    return {
      status: HttpStatus.OK,
      discount_products
    };
  }

  async findOneDiscountProduct(id: number): Promise<Object> {
    const discount_product = await this.discountProductRepository.findBy({ id });

    if (!discount_product) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Discount Product Not Found'
      }
    }

    return {
      status: HttpStatus.OK,
      discount_product
    };
  }

  async updateDiscountProduct(id: number, updateDiscountProductDto: UpdateDiscountProductDto): Promise<Object> {
    const discount_product = await this.discountProductRepository.findBy({ id });

    if (!discount_product) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Discount Product Not Found'
      }
    }

    await this.discountProductRepository.update({ id }, { ...updateDiscountProductDto });

    const updated_discount_product = await this.discountProductRepository.findBy({ id });

    return {
      status: HttpStatus.OK,
      discount_product: updated_discount_product
    }
  }

  async removeDiscountProduct(id: number): Promise<Object | HttpStatus> {
    const discount_product = await this.discountProductRepository.findBy({ id });

    if (!discount_product) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Discount Product Not Found'
      }
    }

    await this.discountProductRepository.delete({ id });

    return HttpStatus.OK;
  }
}