import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-users.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Users } from "./entities/users.entities";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginDtoUser } from "./dto/login.dto";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { ActiveUserDto } from "./dto/activate-user.dto";
import { PhoneUserDto } from "./dto/Otp-create.dto";
import { Cookiegetter } from "../decorators/cookiegetter";
import { UserGuard } from "../guards/user.guard";



@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ){}

    // @UseInterceptors(FileInterceptor('image'))
    @ApiOperation({summary:"User Registration"})
    @ApiResponse({status:200,type:Users})
    @Post('auth')
    register(
        @Body() createUserDto:CreateUserDto,
        @Res({passthrough:true}) res:Response
    ){
        return this.usersService.userRegister(createUserDto,res)
    }

    @ApiOperation({summary:"User Login"})
    @ApiResponse({status:200,type:Users})
    @Post('login')
    signin(
        @Body() phoneUserDto:PhoneUserDto,
        @Res({passthrough:true}) res:Response
    ){
        return this.usersService.userLogin(phoneUserDto,res)
    }

    @ApiOperation({summary:"User Login"})
    @ApiResponse({status:200,type:Users})
    @Post('login/otp')
    loginOtp(
        @Body() loginDtoUser:LoginDtoUser,
        @Res({passthrough:true}) res:Response
    ){
        return this.usersService.userOtpLogin(loginDtoUser,res)
    }


    @ApiOperation({summary:"User Logout"})
    @ApiResponse({status:200,type:Users})
    @Post('logout')
    logout(
        @Cookiegetter('refresh_token') refreshToken:string,
        @Res({passthrough:true}) res:Response
    ){
        return this.usersService.userlogout(refreshToken,res)
    }

    @ApiOperation({summary:"Find all Users"})
    @ApiResponse({status:200,type:[Users]})
    @Get('findall')
    getallusers(){
        return this.usersService.getallusers()
    }

    @ApiOperation({summary:"Find One User"})
    @ApiResponse({status:200,type:Users})
    @Get('findone/:id')
    findOne(
        @Param('id') id:string
    ){
        return this.usersService.getoneuser(+id)
    }

    @ApiOperation({summary:"Find One Update User"})
    @ApiResponse({status:200,type:Users})
    @Patch('update/:id')
    updateuser(
        @Param('id') id:string,
        @Body() updateUserDto:UpdateUserDto
    ){
        return this.usersService.updateuser(+id,updateUserDto)
    }


    @ApiOperation({summary:"Remove User"})
    @ApiResponse({status:200})
    @Delete('delete/:id')
    Deleteuser(
        @Param('id') id:string,
    ){
        return this.usersService.deleteuser(+id)
    }

}