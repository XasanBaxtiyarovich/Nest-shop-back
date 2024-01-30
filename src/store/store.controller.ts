import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Body, Delete, Get, Param, Post } from "@nestjs/common";

import { Store } from "./entites";
import { AddCountDto } from "./dto";
import { StoreService } from "./store.service";


@ApiTags('store')
@Controller('store')
export class StoreController{
    constructor( private readonly storeService: StoreService ){}

    @ApiOperation({ summary: 'add store' })
    @ApiResponse({ status: 200, type: Store })
    @Post()
    createStore(
        @Body() addCountDto: AddCountDto
    ): Promise<Object> {
        return  this.storeService.createStore(addCountDto)
    }

    @ApiOperation({ summary: 'find stories' })
    @ApiResponse({ status: 200, type: [ Store ] })
    @Get()
    findAllStore(): Promise<Object> {
        return this.storeService.findAllStore()
    }

    @ApiOperation({ summary: 'find one store' })
    @ApiResponse({ status: 200, type: Store })
    @Get(':id')
    findOneStore(
        @Param('id') id: number
    ): Promise<Object> {
        return this.storeService.findOneStore(id)
    }


    @ApiOperation({ summary: 'remove one store' })
    @ApiResponse({ status: 200, type: Store })
    @Delete(':id')
    removeStore(
        @Param('id') id: number
    ): Promise<Object> {
        return this.storeService.removeStore(id) 
    }
}