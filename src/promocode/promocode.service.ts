import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promocode } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class PromocodeService {
  constructor(
    @InjectRepository(Promocode)
    private promocodeRepository: Repository<Promocode>,
  ) {}

  async create(createPromocodeDto: CreatePromocodeDto): Promise<Object> {
    const existingPromocode = await this.promocodeRepository.findOne({
      where: { name: createPromocodeDto.name },
    });

    if (existingPromocode) {
      return {
        message: 'Promocode already exists',
        state: HttpStatus.CONFLICT,
      };
    }

    const newPromocode = await this.promocodeRepository.save({
      ...createPromocodeDto,
    });

    return {
      promocode: newPromocode,
      status: HttpStatus.CREATED,
      message: 'Created successfully',
    };
  }

  async findAll(): Promise<Object> {
    const promocodes = await this.promocodeRepository.find();

    if (promocodes.length == 0) {
      return {
        message: 'Promocodes not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      promocodes,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: number): Promise<Object> {
    const promocode = await this.promocodeRepository.findOne({
      where: { id: id },
    });

    if (!promocode) {
      return {
        message: 'Promocode not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      promocode,
      status: HttpStatus.OK,
    };
  }

  async update(
    id: number,
    updatePromocodeDto: UpdatePromocodeDto,
  ): Promise<Object> {
    const promocode = await this.promocodeRepository.findOne({
      where: { id: id },
    });

    if (!promocode) {
      return {
        message: 'Promocode not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    if (promocode.name !== updatePromocodeDto.name) {
      const existingPromocode = await this.promocodeRepository.findOne({
        where: { name: updatePromocodeDto.name },
      });

      if (existingPromocode) {
        return {
          message: 'Promocode already exists',
          state: HttpStatus.CONFLICT,
        };
      }
    }
    await this.promocodeRepository.update(id, { ...updatePromocodeDto });

    const updatePromocode = await this.promocodeRepository.findOne({
      where: { id: id },
    });

    return {
      promocode: updatePromocode,
      status: HttpStatus.OK,
    };
  }

  async remove(id: number): Promise<Object> {
    const promocode = await this.promocodeRepository.findOne({
      where: { id: id },
    });

    if (!promocode) {
      return {
        message: 'Promocode not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    await this.promocodeRepository.delete({ id: id });

    return {
      message: 'Delete successfully',
      status: HttpStatus.OK,
    };
  }
}
