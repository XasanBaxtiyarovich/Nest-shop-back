import { JwtModule } from "@nestjs/jwt"
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Admin } from "./entites";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { FilesService } from "../files/files.service";


@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                Admin
            ]
        ),
        JwtModule.register({}),
    ],
    controllers:[AdminController],
    providers:[AdminService,FilesService]
})
export class AdminModule {}