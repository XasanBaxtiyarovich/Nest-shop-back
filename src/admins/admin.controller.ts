import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";

import { Admin } from "./entites";
import { AdminService } from "./admin.service";
import { CreateAdminDto, LoginAdminDto, UpdateAdminDto, NewPasswordDto } from "./dto";


@ApiTags('admin')
@Controller('admin')
export class AdminController {
    constructor( private readonly adminService: AdminService ){}

    @ApiOperation({ summary: "admin sign up" })
    @ApiResponse({ status: 200, type: Admin })
    @Post('signup')
    admin_signup(
        @Body() createAdminDto:CreateAdminDto,
    ): Promise<Object> {
        return this.adminService.admin_signup(createAdminDto)
    }

    @ApiOperation({ summary: "admin sign in" })
    @ApiResponse({ status: 200, type: Admin })
    @Post('signin')
    admin_signin(
        @Body() loginAdminDto:LoginAdminDto,
        @Res({passthrough:true}) res:Response
    ): Promise<Object> {
        return this.adminService.admin_signin(loginAdminDto,res)
    }

    @ApiOperation({ summary: "find admins" })
    @ApiResponse({ status: 200, type: [ Admin ] })
    @Get('find')
    find_admins(): Promise<Object>{
        return this.adminService.find_admins()
    }

    @ApiOperation({ summary: "find one admin" })
    @ApiResponse({ status: 200, type: Admin })
    @Get('find/:id')
    find_one_admin(
        @Param('id') id: number
    ): Promise<Object> {
        return this.adminService.find_one_admin(id)
    }

    @ApiOperation({ summary: "update one admin date" })
    @ApiResponse({ status: 200, type: Admin })
    @Put('update/:id')
    update_admin_date(
        @Param('id') id: number,
        @Body() updateAdminDto: UpdateAdminDto
    ): Promise<Object> {
        return this.adminService.update_admin_date(id, updateAdminDto)
    }

    @ApiOperation({ summary: "update one admin password" })
    @ApiResponse({ status: 200, type: Admin })
    @Post('update-pass/:id')
    update_admin_pass(
        @Param('id') id: number,
        @Body() newPasswordDto: NewPasswordDto
    ): Promise<Object> {
        return this.adminService.update_admin_pass(id, newPasswordDto)
    }

    @ApiOperation({summary:"remove one admin"})
    @ApiResponse({ status: 200 })
    @Delete('remove/:id')
    remove_admin(
        @Param('id') id: number,
    ): Promise<Object> {
        return this.adminService.remove_admin(id)
    }
}