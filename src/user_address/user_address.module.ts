import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from './entities';
import { UserAddressController } from './user_address.controller';
import { UserAddressService } from './user_address.service';
import {Users} from "../users/entities";

@Module({
    imports: [TypeOrmModule.forFeature([UserAddress, Users])],
    controllers: [UserAddressController],
    providers: [UserAddressService],
})
export class UserAddressModule {}
