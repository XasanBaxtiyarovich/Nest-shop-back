import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Product } from "../product/entities";
import { StoreService } from "./store.service";
import { Store } from "./entites/store.entities";
import { StoreController } from "./store.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                Store,
                Product
            ]
        ),
    ],
    controllers:[StoreController],
    providers:[StoreService]
})
export class StoreModule {}