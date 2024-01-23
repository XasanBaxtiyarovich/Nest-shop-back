import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from "@nestjs/common";

import { Users } from "./entities";
import { UsersService } from "./users.service";
import { PhoneUserDto, LoginDtoUser, UpdateUserDto, CreateUserDto } from "./dto";

@ApiTags('user')
@Controller('user')
export class UsersController {
    constructor( private readonly usersService: UsersService ){}

    @ApiOperation({summary:"user sign up"})
    @ApiResponse({status:200,type:Users})
    @Post('signup')
    user_signup(
        @Body() createUserDto:CreateUserDto
    ): Promise<Object> {
        return this.usersService.user_signup(createUserDto)
    }

    @ApiOperation({summary:"user sign in"})
    @ApiResponse({status:200,type:Users})
    @Post('login')
    user_signin(
        @Body() phoneUserDto:PhoneUserDto
    ): Promise<Object> {
        return this.usersService.user_signin(phoneUserDto)
    }

    @ApiOperation({summary:"user sign in otp"})
    @ApiResponse({status:200,type:Users})
    @Post('login/otp')
    user_otp_created(
        @Body() loginDtoUser:LoginDtoUser,
        @Res({passthrough:true}) res:Response
    ): Promise<Object> {
        return this.usersService.user_otp_created(loginDtoUser, res)
    }

    @ApiOperation({summary:"find users"})
    @ApiResponse({status:200,type:[ Users ]})
    @Get('find')
    find_users(): Promise<Object> {
        return this.usersService.find_users()
    }

    @ApiOperation({summary:"find one user"})
    @ApiResponse({status:200,type:Users})
    @Get('find/:id')
    find_user(
        @Param('id') id: number
    ): Promise<Object> {
        return this.usersService.find_user(id)
    }

    @ApiOperation({summary:"update one user"})
    @ApiResponse({status:200,type:Users})
    @Patch('update/:id')
    update_user(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<Object> {
        return this.usersService.update_user(id, updateUserDto)
    }


    @ApiOperation({summary:"remove one user"})
    @ApiResponse({status:200})
    @Delete('delete/:id')
    remove_user(
        @Param('id') id: number,
    ): Promise<Object | Number>{
        return this.usersService.remove_user(id)
    }
}