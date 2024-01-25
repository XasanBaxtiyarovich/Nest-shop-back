import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { AddCountDto } from "./dto/add-store.dto";
import { StoreService } from "./store.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('store')
@Controller('store')
export class StoreController{
    constructor(
        private readonly storeService: StoreService
    ) {}


    @Post('create')
    addCount(
        @Body() addCountDto:AddCountDto
    ){
        return  this.storeService.addCount(addCountDto)
    }

    @Get('findall')
    getall(){
        return this.storeService.findAll()
    }

    @Get('find/:id')
    getOne(
        @Param('id') id:string
    ){
        return this.storeService.findOne(+id)
    }


    @Delete('delete/:id')
    deleteStore(
        @Param('id') id:string
    ){
        return this.storeService.deleteStore(+id) 
    }


}