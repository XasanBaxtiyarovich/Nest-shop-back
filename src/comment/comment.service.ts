import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Object> {
    const newComment = await this.commentsRepository.save({
      ...createCommentDto,
    });

    return {
      Comment: newComment,
      status: HttpStatus.CREATED,
      message: 'Created success fully',
    };
  }

  async findAll(): Promise<Object> {
    const comments = await this.commentsRepository.find();

    if (comments.length == 0) {
      return {
        message: 'Comments not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      comments,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: number): Promise<Object> {
    const comment = await this.commentsRepository.findBy({ id });

    if (!comment) {
      return {
        message: 'comment not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      comment,
      status: HttpStatus.OK,
    };
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Object> {
    const [comment] = await this.commentsRepository.findBy({ id });

    if (!comment) {
      return {
        message: 'comment not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    const updated_comment = await this.commentsRepository.update(
      { id },
      { ...updateCommentDto },
    );

    return {
      discount: updated_comment,
      status: HttpStatus.OK,
    };
  }

  async remove(id: number):Promise<Object> {
    const comment = await this.commentsRepository.findBy({ id });

    if (!comment) {
      return {
        message: 'Comment item not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    await this.commentsRepository.delete({ id });

    return {
      message: 'Delete successfully',
      status: HttpStatus.OK,
    };
  }
}
