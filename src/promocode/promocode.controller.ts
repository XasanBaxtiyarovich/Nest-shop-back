import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PromocodeService } from './promocode.service';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Promocode } from './entities';

@ApiTags('promocode')
@Controller('promocode')
export class PromocodeController {
  constructor(private readonly promocodeService: PromocodeService) {}

  @ApiOperation({ summary: 'Add Promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Post()
  create(
    @Body() createPromocodeDto: CreatePromocodeDto,
  ): Promise<String | Object> {
    return this.promocodeService.create(createPromocodeDto);
  }

  @ApiOperation({ summary: 'Get All Promocodes' })
  @ApiResponse({ status: 200, type: [Promocode] })
  @Get()
  findAll(): Promise<Object> {
    return this.promocodeService.findAll();
  }

  @ApiOperation({ summary: 'Get One Promocode ' })
  @ApiResponse({ status: 200, type: Promocode })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Object> {
    return this.promocodeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update One Promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePromocodeDto: UpdatePromocodeDto,
  ): Promise<Object> {
    return this.promocodeService.update(+id, updatePromocodeDto);
  }

  @ApiOperation({ summary: 'Delete One Promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Object | Number> {
    return this.promocodeService.remove(+id);
  }
}
