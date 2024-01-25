import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './entities';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Add comment' })
  @ApiResponse({ status: 201, type: Comment })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<Object> {
    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'Get All comments' })
  @ApiResponse({ status: 201, type: Comment })
  @Get()
  findAll(): Promise<Object> {
    return this.commentService.findAll();
  }

  @ApiOperation({ summary: 'Get One comment' })
  @ApiResponse({ status: 201, type: Comment })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Object> {
    return this.commentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update comment' })
  @ApiResponse({ status: 201, type: Comment })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Object> {
    return this.commentService.update(+id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 201, type: Comment })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Object> {
    return this.commentService.remove(+id);
  }
}
