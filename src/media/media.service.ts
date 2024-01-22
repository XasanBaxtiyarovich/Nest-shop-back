import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Media } from './entities';
import { CreateMediaDto } from './dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private mediaRepository: Repository<Media>,
    private fileService: FilesService
  ) {}

  async createMedia(createMediaDto: CreateMediaDto, image: any): Promise<Object> {
    const file = await this.fileService.createFile(image);

    const newMedia = await this.mediaRepository.save({ ...createMediaDto, media_link: process.env.API_URL+file });

    return {
      message: 'Create successfully',
      media: newMedia,
      status: HttpStatus.OK
     };
  }

  async findAllMedia(): Promise<Object> {
    const medias = await this.mediaRepository.find();

    if(medias.length === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Media Not Found'
      }
    }

    return {
      status: 200,
      medias
    }
  }

  async findOneMedia(id: number): Promise<Object> {
    const media = await this.mediaRepository.findBy({ id });

    if(!media) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Media Not Found'
      }
    }

    return {
      status: 200,
      media
    }
  }

  async removeMedia(id: number): Promise<Object | Number> {
    const media = await this.mediaRepository.findBy({ id });

    if(!media) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Media Not Found'
      }
    }

    await this.mediaRepository.delete({ id });

    return HttpStatus.OK;
  }
}
