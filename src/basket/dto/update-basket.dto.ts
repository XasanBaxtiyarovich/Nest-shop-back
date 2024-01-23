import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Users } from '../../users/entities';

export class UpdateBasketDto {
  @ApiProperty({ example: '1', description: 'User ID' })
  @IsNotEmpty()
  user_id: Users;
}