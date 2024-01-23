import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from "@nestjs/common";

import { Users } from "./entities";
import { UsersService } from "./users.service";
import { Cookiegetter } from "../decorators/cookiegetter";
import { PhoneUserDto, LoginDtoUser, UpdateUserDto, CreateUserDto } from "./dto";

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor( private readonly usersService: UsersService ){}

    @ApiOperation({summary:"user sign up"})
    @ApiResponse({status:200,type:Users})
    @Post('auth')
    register(
        @Body() createUserDto:CreateUserDto,
        @Res({ passthrough: true }) res:Response
    ){
        return this.usersService.userRegister(createUserDto, res)
    }

    @ApiOperation({summary:"user sign in"})
    @ApiResponse({status:200,type:Users})
    @Post('login')
    signin(
        @Body() phoneUserDto:PhoneUserDto,
        @Res({passthrough:true}) res:Response
    ){
        return this.usersService.userLogin(phoneUserDto,res)
    }

    @ApiOperation({summary:"user sign in otp"})
    @ApiResponse({status:200,type:Users})
    @Post('login/otp')
    loginOtp(
        @Body() loginDtoUser:LoginDtoUser,
        @Res({passthrough:true}) res:Response
    ){
        return this.usersService.userOtpLogin(loginDtoUser,res)
    }


    @ApiOperation({summary:"user sign out"})
    @ApiResponse({status:200,type:Users})
    @Post('logout')
    logout(
        @Cookiegetter('refresh_token') refreshToken:string,
        @Res({passthrough:true}) res:Response
    ){
        return this.usersService.userlogout(refreshToken,res)
    }

    @ApiOperation({summary:"find users"})
    @ApiResponse({status:200,type:[Users]})
    @Get('findall')
    getallusers(){
        return this.usersService.getallusers()
    }

    @ApiOperation({summary:"find one user"})
    @ApiResponse({status:200,type:Users})
    @Get('findone/:id')
    findOne(
        @Param('id') id:string
    ){
        return this.usersService.getoneuser(+id)
    }

    @ApiOperation({summary:"update one user"})
    @ApiResponse({status:200,type:Users})
    @Patch('update/:id')
    updateuser(
        @Param('id') id:string,
        @Body() updateUserDto:UpdateUserDto
    ){
        return this.usersService.updateuser(+id,updateUserDto)
    }


    @ApiOperation({summary:"remove one user"})
    @ApiResponse({status:200})
    @Delete('delete/:id')
    Deleteuser(
        @Param('id') id:string,
    ){
        return this.usersService.deleteuser(+id)
    }

}