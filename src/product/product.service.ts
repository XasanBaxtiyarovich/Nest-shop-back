import { HttpStatus, Injectable } from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Object> {
    const newProduct = await this.productRepository.save(
      {
        ...createProductDto
      }
    );

    return {
      product: newProduct,
      status: HttpStatus.CREATED,
      message: 'Created success fully'
    };
  }

  async findAllActiveProduct(): Promise<Object> {
    const products = await this.productRepository.find({ where: {is_active: true}});
    if (products.length === 0) {
      return {
        message: 'Products not found',
        status: HttpStatus.NOT_FOUND 
      };
    }

    return {
      products,
      status: HttpStatus.OK
    };
  }

  async findAllNotActiveProduct(): Promise<Object> {
    const products = await this.productRepository.find({ where: {is_active: false}});
    if (products.length === 0) {
      return {
        message: 'Products not found',
        status: HttpStatus.NOT_FOUND 
      };
    }

    return {
      products,
      status: HttpStatus.OK
    };
  }

  async findOneActiveProduct(id: number): Promise<Object> {
    const [ product ] = await this.productRepository.findBy({ id, is_active: true });
    if (!product) {
      return {
        message: 'Product not found',
        status: HttpStatus.NOT_FOUND 
      };
    }

    return {
      product,
      status: HttpStatus.OK
    }
  }

  async findOneNotActiveProduct(id: number): Promise<Object> {
    const [ product ] = await this.productRepository.findBy({ id, is_active: false });
    if (!product) {
      return {
        message: 'Product not found',
        status: HttpStatus.NOT_FOUND 
      };
    }

    return {
      product,
      status: HttpStatus.OK
    }
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Object> {
    const [ product ] = await this.productRepository.findBy({ id, is_active: true });
    if (!product) {
      return {
        message: 'Product not found',
        status: HttpStatus.NOT_FOUND 
      };
    }

    await this.productRepository.update({ id }, { ...updateProductDto });

    const updated_product = await this.productRepository.findBy({ id });

    return {
      discount: updated_product,
      status: HttpStatus.OK
    }
  }

  async removeProduct(id: number): Promise<Object | Number> {
    const [ product ] = await this.productRepository.findBy({ id });
    if (!product) {
      return {
        message: 'Product not found',
        status: HttpStatus.NOT_FOUND 
      };
    }

    await this.productRepository.delete({ id });

    return HttpStatus.OK;
  }

  async active(id: number): Promise<Object | HttpStatus> {
    const [ product ] = await this.productRepository.findBy({ id });

    if (!product) {
      return {
        message: 'Product Not Found',
        status: HttpStatus.NOT_FOUND
      };
    }
    
    if (product.is_active) {
      await this.productRepository.update({ id }, { is_active: false });
      return {
        message: 'Product not activated',
        status: HttpStatus.OK
      }
    } else {
      await this.productRepository.update({ id }, { is_active: true });
      return {
        message: 'Product ativeted',
        status: HttpStatus.OK
      }
    }
  }

  async searche_product(name: string): Promise<Object> {
    const products = await this.productRepository.find({
      where : {
        name : Like(`%${name}%`),
        is_active: true
      }
    });

    if (products.length === 0) {
      return {
        message: 'Products Not Found',
        status: HttpStatus.NOT_FOUND
      };
    }

    return {
      status: HttpStatus.OK,
      products
    };
  }
}