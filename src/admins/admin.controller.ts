import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from "express";
import { Cookiegetter } from "../decorators/cookiegetter";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { Admin } from "./entites/admin.entites";
import { AdminService } from "./admin.service";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { NewPasswordDto } from "./dto/new-password";
import { AdminGuard } from "../guards/admin.guard";



@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ){}


    @ApiOperation({summary:"Admin update Password"})
    @ApiResponse({status:200,type:Admin})
    @Post('newpassword/:id')
    newpassword(
        @Param('id') id:string,
        @Body() newPasswordDto:NewPasswordDto
    ){
        return this.adminService.newPassword(+id,newPasswordDto)
    }


    @ApiOperation({summary:"Admin Registration"})
    @ApiResponse({status:200,type:Admin})
    @Post('register')
    @UseGuards(AdminGuard)
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

    @ApiOperation({summary:"Admin Logout"})
    @ApiResponse({status:200,type:Admin})
    @Post('logout')
    logout(
        @Cookiegetter('refresh_token') refreshToken:string,
        @Res({passthrough:true}) res:Response
    ){
        return this.adminService.adminlogout(refreshToken,res)
    }

    @ApiOperation({summary:"Find all Admin"})
    @ApiResponse({status:200,type:[Admin]})
    @Get('findall')
    @UseGuards(AdminGuard)
    getallAdmin(){
        return this.adminService.getalladmins()
    }

    @ApiOperation({summary:"Find One Admin"})
    @ApiResponse({status:200,type:Admin})
    @Get('findone/:id')
    @UseGuards(AdminGuard)
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
        return this.adminService.updateAdmin(+id,updateAdminDto)
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