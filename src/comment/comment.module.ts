import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities';
import { Product } from '../product/entities';
import { Users } from '../users/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Comment,Product,Users])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
