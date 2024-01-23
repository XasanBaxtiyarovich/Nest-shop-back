import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Media } from './entities';
import { Product } from '../product/entities'; 
import { MediaService } from './media.service';
import { FilesModule } from '../files/files.module';
import { MediaController } from './media.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Media, Product
      ]
    ),
    FilesModule
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
