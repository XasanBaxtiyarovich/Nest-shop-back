import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import {JwtModule} from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./entities/users.entities";
import { OtpModule } from "../otp/otp.module";
import { SmsModule } from "../sms/sms.module";
import { Otp } from "../otp/entites/create-otp.dto";
import { FilesService } from "../files/files.service";
import { Basket } from "../basket/entities";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            Users,
            Basket,
            Otp
        ]),
        JwtModule.register({}),
        // MailModule,
        OtpModule,
        SmsModule
    ],
    controllers:[UsersController],
    providers:[UsersService,FilesService]
})
export class UserModule {}