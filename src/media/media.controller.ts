import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';

import { Media } from './entities';
import { CreateMediaDto } from './dto';
import { MediaService } from './media.service';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiOperation({summary: 'create media'})
  @ApiResponse({status: 201, type: Media})
  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  createMedia(
    @Body() createMediaDto: CreateMediaDto,
    @UploadedFile() image: any
  ): Promise<Object> {
    return this.mediaService.createMedia(createMediaDto, image);
  }

  @ApiOperation({summary: 'find mediaes'})
  @ApiResponse({status: 201, type: [Media]})
  @Get()
  findAll(): Promise<Object>  {
    return this.mediaService.findAllMedia();
  }

  @ApiOperation({summary: 'find one media'})
  @ApiResponse({status: 201, type: Media})
  @Get(':id')
  findOne(
    @Param('id') id: number
  ): Promise<Object> {
    return this.mediaService.findOneMedia(id);
  }

  // Remove one media
  @ApiOperation({summary: 'Remove one media'})
  @ApiResponse({status: 201, type: Media})
  @Delete(':id')
  remove(
    @Param('id') id: number
  ): Promise<Object | Number>  {
    return this.mediaService.removeMedia(id);
  }
}
