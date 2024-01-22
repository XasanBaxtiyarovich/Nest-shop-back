import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Otp } from "./entites/create-otp.dto";



@Module({
    imports:[
        TypeOrmModule.forFeature([Otp])
    ],
    controllers:[],
    providers:[],
})
export class OtpModule {}