import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { Promocode } from './entities';
import { PromocodeService } from './promocode.service';
import { CreatePromocodeDto, UpdatePromocodeDto } from './dto';


@ApiTags('promocode')
@Controller('promocode')
export class PromocodeController {
  constructor(private readonly promocodeService: PromocodeService) {}

  @ApiOperation({ summary: 'add promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Post()
  create(
    @Body() createPromocodeDto: CreatePromocodeDto,
  ): Promise<String | Object> {
    return this.promocodeService.create(createPromocodeDto);
  }

  @ApiOperation({ summary: 'find promocodes' })
  @ApiResponse({ status: 200, type: [Promocode] })
  @Get()
  findAll(): Promise<Object> {
    return this.promocodeService.findAll();
  }

  @ApiOperation({ summary: 'find one promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Object> {
    return this.promocodeService.findOne(+id);
  }

  @ApiOperation({ summary: 'update one promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePromocodeDto: UpdatePromocodeDto,
  ): Promise<Object> {
    return this.promocodeService.update(+id, updatePromocodeDto);
  }

  @ApiOperation({ summary: 'remove one promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Object | Number> {
    return this.promocodeService.remove(+id);
  }
}
