import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Discount } from './entities';
import { CreateDiscountDto, UpdateDiscountDto } from './dto';


@Injectable()
export class DiscountService {
  constructor(@InjectRepository(Discount) private discountRepository: Repository<Discount>) {}
  
  async createDiscount(createDiscountDto: CreateDiscountDto): Promise<Object> {
    const [ discount ] = await this.discountRepository.findBy({ name: createDiscountDto.name });
    if (discount) {
      return { 
        message: 'Discount name already exists',
        status: HttpStatus.CONFLICT
      };
    }
    const newDiscount = await this.discountRepository.save({ ...createDiscountDto });

    return {
      discount: newDiscount,
      status: HttpStatus.CREATED,
      message: 'Created success fully'
    };
  }

  async findAllDiscount(): Promise<Object> {
    const discounts = await this.discountRepository.find();
    if (discounts.length === 0) {
      return {
        message: 'Discounts not found',
        status: HttpStatus.NOT_FOUND 
      };
    }

    return {
      discounts,
      status: HttpStatus.OK
    };
  }

  async findOneDiscount(id: number): Promise<Object> {
    const [ discount ] = await this.discountRepository.findBy({ discount_id: id });
    if (!discount) {
      return {
        message: 'Discount not found',
        status: HttpStatus.NOT_FOUND 
      };
    }

    return {
      discount,
      status: HttpStatus.OK
    }
  }

  async updateDiscount(id: number, updateDiscountDto: UpdateDiscountDto) {
    const [ discount ] = await this.discountRepository.findBy({ discount_id: id });
    if (!discount) {
      return {
        message: 'Discount not found',
        status: HttpStatus.NOT_FOUND 
      };
    }

    if (discount.name !== updateDiscountDto.name) {
      const [ name ] = await this.discountRepository.findBy({ name: updateDiscountDto.name });
      if (name) {
        return {
          message: 'Discount name already exists',
          status: HttpStatus.NOT_FOUND
        };
      }
    }
    
    await this.discountRepository.update({ discount_id: id }, { ...updateDiscountDto });

    const updated_discount = await this.discountRepository.findBy({ discount_id: id });

    return {
      discount: updated_discount,
      status: HttpStatus.OK
    }
  }

  async removeDiscount(id: number): Promise<Object | Number> {
    const [ discount ] = await this.discountRepository.findBy({ discount_id: id });
    if (!discount) {
      return {
        message: 'Discount not found',
        status: HttpStatus.NOT_FOUND 
      };
    }

    await this.discountRepository.delete({ discount_id: id });

    return HttpStatus.OK;
  }
}