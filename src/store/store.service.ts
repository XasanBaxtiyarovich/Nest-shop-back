import { Response } from 'express';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AddCountDto } from "./dto/add-store.dto";
import { Product } from "../product/entities";
import { Store } from "./entites/store.entities";
import { HttpStatus } from '@nestjs/common';


export class StoreService {
    constructor(
        @InjectRepository(Store) private storeRepository: Repository<Store>,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) {}

    async addCount(addCountDto: AddCountDto) {
        const [ product ] =  await this.productRepository.findBy({ id: +addCountDto.product });

        if(!product) {
            return {
                message:"Product not found",
                status:HttpStatus.NOT_FOUND
            }
        }
        
        const store = await this.storeRepository.save({...addCountDto})
        
        const count = product.total_count + addCountDto.count;

        await this.productRepository.update({ id: +addCountDto.product }, { total_count: count });
        
        const new_store = await this.storeRepository.findOne({ where: {id: store.id }, relations: {product: true} });

        return {
            message:"Store added successfully",
            store: new_store,
        }

    }

    async findAll() {

        const findallStore = await this.storeRepository.find({relations:['product_id']})
        console.log(findallStore.length);
        
        if(findallStore.length == 0 || findallStore.length<0) {
            return {
                message:"Store not found",
                status:HttpStatus.NOT_FOUND
            }
        }

        return {
            message:"Store successfuly Founded",
            store:findallStore
        }

    }

    async findOne(id:number) {
        const findOneStore = await this.storeRepository.find({where:{id:id},relations:['product_id']})
        
        if(findOneStore.length==0) {
            return {
                message:"Store not found",
                status:HttpStatus.NOT_FOUND
            }
        }

        return {
            message:"Store successfuly Founded",
            store:findOneStore
        }
    }

    // async updateStore(id:number,updateDto){
        
    // }

    async deleteStore(id:number) {
        const findStore = await this.storeRepository.findBy({id:id})

        if(findStore.length==0) {
            return {
                message:"Store not found",
                status:HttpStatus.NOT_FOUND
            }
        }

        const deleteStore  = await this.storeRepository.delete({id:id})

        return {
            message:"Store successfuly Deleted",
            deleteStore:findStore
        }


    }

    
}