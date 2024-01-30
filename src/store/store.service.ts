import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus, Injectable } from '@nestjs/common';

import { Store } from "./entites";
import { AddCountDto } from "./dto";
import { Product } from "../product/entities";
import { ProductService } from "../product/product.service";


@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store) private storeRepository: Repository<Store>,
        private productService: ProductService
    ) {}

    async createStore(addCountDto: AddCountDto): Promise<Object> {
        const product: HttpStatus | Product = await this.productService.update_count(addCountDto.count, +addCountDto.product);
        
        if (product === HttpStatus.NOT_FOUND ) {
            return {
                status: HttpStatus.NOT_FOUND,
                message: "Product Not Found"
            }
        }

        const store = await this.storeRepository.save({ product: addCountDto.product, count: addCountDto.count })
        
        const new_store = await this.storeRepository.findOne({ 
            where: { id: store.id },
            relations: { product: true }
        });

        return {
            status: HttpStatus.OK,
            store: new_store,
        }
    }

    async findAllStore(): Promise<Object> {
        const stories = await this.storeRepository.find({ relations: { product: true} });
        
        if(stories.length === 0) {
            return {
                message:"Store not found",
                status:HttpStatus.NOT_FOUND
            }
        }

        return {
            status: HttpStatus.OK,
            store: stories
        }
    }

    async findOneStore(id: number): Promise<Object> {
        const store = await this.storeRepository.findOne({ 
            where:{ id }, 
            relations: { product: true } 
        });
        
        if(!store) {
            return {
                message:"Store not found",
                status:HttpStatus.NOT_FOUND
            }
        }

        return {
            status: HttpStatus.OK,
            store
        }
    }

    async removeStore(id: number): Promise<Object | HttpStatus> {
        const [ store ] = await this.storeRepository.findBy({ id });

        if(!store) {
            return {
                message: "Store not found",
                status: HttpStatus.NOT_FOUND
            }
        }

        await this.storeRepository.delete({ id });

        return HttpStatus.NOT_FOUND;
    }    
}