import { Module } from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm";
import { OtpModule } from "../otp/otp.module";
import { SmsModule } from "../sms/sms.module";
import { Otp } from "../otp/entites/create-otp.dto";
import { FilesService } from "../files/files.service";
import { Admin } from "./entites/admin.entites";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            Admin
        ]),
        JwtModule.register({}),
    ],
    controllers:[AdminController],
    providers:[AdminService,FilesService]
})
export class AdminModule {}