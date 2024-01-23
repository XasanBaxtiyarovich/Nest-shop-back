import { Response } from "express";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from "@nestjs/common";

import { Admin } from "./entites";
import { AdminService } from "./admin.service";
import { Cookiegetter } from "../decorators/cookiegetter";
import { CreateAdminDto, LoginAdminDto, UpdateAdminDto, NewPasswordDto } from "./dto";


@Controller('admin')
export class AdminController {
    constructor( private readonly adminService: AdminService ){}



    @ApiOperation({summary:"Admin Registration"})
    @ApiResponse({status:200,type:Admin})
    @Post('register')
    register(
        @Body() createAdminDto:CreateAdminDto,
        @Res({passthrough:true}) res:Response
    ){
        return this.adminService.adminRegister(createAdminDto,res)
    }

    @ApiOperation({summary:"Admin Login"})
    @ApiResponse({status:200,type:Admin})
    @Post('login')
    signin(
        @Body() loginAdminDto:LoginAdminDto,
        @Res({passthrough:true}) res:Response
    ){
        return this.adminService.adminLogin(loginAdminDto,res)
    }

    @ApiOperation({summary:"Find all Admin"})
    @ApiResponse({status:200,type:[Admin]})
    @Get('findall')
    getallAdmin(){
        return this.adminService.getalladmins()
    }

    @ApiOperation({summary:"Find One Admin"})
    @ApiResponse({status:200,type:Admin})
    @Get('findone/:id')
    findOne(
        @Param('id') id:string
    ){
        return this.adminService.getoneadmin(+id)
    }

    @ApiOperation({summary:"Find One Update Admin"})
    @ApiResponse({status:200,type:Admin})
    @Patch('update/:id')
    updateAdmin(
        @Param('id') id:string,
        @Body() updateAdminDto:UpdateAdminDto
    ){
        return this.adminService.updateAdminDate(+id,updateAdminDto)
    }

    @ApiOperation({summary:"Admin update Password"})
    @ApiResponse({status:200,type:Admin})
    @Post('newpassword/:id')
    newpassword(
        @Param('id') id:string,
        @Body() newPasswordDto:NewPasswordDto
    ){
        return this.adminService.updateAdminPassword(+id,newPasswordDto)
    }

    @ApiOperation({summary:"Remove Admin"})
    @ApiResponse({status:200})
    @Delete('delete/:id')
    Deleteuser(
        @Param('id') id:string,
    ){
        return this.adminService.deleteAdmin(+id)
    }
}