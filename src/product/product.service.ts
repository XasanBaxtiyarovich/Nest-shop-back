import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Product } from './entities';
import { Category } from '../category/entities';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto, category: Category): Promise<Object> {
    const { categoryId, ...createProductDto2} = createProductDto;
    
    const newProduct = await this.productRepository.save(
      {
        ...createProductDto2,
        category
      }
    );

    return {
      product: newProduct,
      status: HttpStatus.CREATED,
      message: 'Created success fully'
    };
  }

  async findAllActiveProduct(): Promise<Object> {
    const products = await this.productRepository.find({ where: {is_active: true}, relations:{category:true}});
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
    const product = await this.productRepository.findOne({
        where: { id, is_active: true },
        relations: ['category']
    });

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
    const [ product ] = await this.productRepository.findBy({ id, is_active: false }, );
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

  async updateProduct(id: number, updateProductDto: UpdateProductDto, category: Category): Promise<Object> {
    const { categoryId, ...updateProductDto2} = updateProductDto;

    const [ product ] = await this.productRepository.findBy({ id, is_active: true });
    if (!product) {
      return {
        message: 'Product not found',
        status: HttpStatus.NOT_FOUND 
      };
    }

    await this.productRepository.update({ id }, { ...updateProductDto2, category });

    const updated_product = await this.productRepository.findOne({ where: { id }, relations: {category: true}});

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
      },
      relations: { category: true }
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

  async update_count(count: number, id: number): Promise<Product | HttpStatus> {
    const [ product ] =  await this.productRepository.findBy({ id });

    if(!product) HttpStatus.NOT_FOUND;

    await this.productRepository.update(
      { id }, 
      { total_count: product.total_count + count }
    );

    const updated_product = await this.productRepository.findOne({ where: { id } });

    return updated_product;
  }
}