import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Users } from "./entities";
import { Otp } from "../otp/entites";
import {Order} from "../order/entities";
import { Basket } from "../basket/entities";
import { Comment } from "../comment/entities";
import {UserAddress} from "../user_address/entities";

import { OtpModule } from "../otp/otp.module";
import { SmsModule } from "../sms/sms.module";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { FilesService } from "../files/files.service";
import { FilesModule } from "../files/files.module";


@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                Users, Otp, Basket, UserAddress, Order, Comment
            ]
        ),
        JwtModule.register({}),
        OtpModule,
        SmsModule,
        FilesModule
    ],
    controllers:[UsersController],
    providers:[UsersService, FilesService]
})
export class UserModule {}