import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";

import { Users } from "./entities";
import { UsersService } from "./users.service";
import { SignInDto, OtpCreateDto, UpdateDateDto, CreateUserDto } from "./dto";

@ApiTags('user')
@Controller('user')
export class UsersController {
    constructor( private readonly usersService: UsersService ){}

    @ApiOperation({ summary: "user sign up" })
    @ApiResponse({ status: 200, type: Users })
    @Post('signup')
    user_signup(
        @Body() createUserDto: CreateUserDto
    ): Promise<Object> {
        return this.usersService.user_signup(createUserDto)
    }

    @ApiOperation({summary: "user sign in"})
    @ApiResponse({ status: 200, type: Users })
    @Post('signin')
    user_signin(
        @Body() signInDto: SignInDto
    ): Promise<Object> {
        return this.usersService.user_signin(signInDto)
    }

    @ApiOperation({ summary: "user sign in otp" })
    @ApiResponse({ status: 200, type: Users })
    @Post('signin/otp')
    user_otp_created(
        @Body() otpCreateDtoUser: OtpCreateDto,
        @Res({passthrough:true}) res: Response
    ): Promise<Object> {
        return this.usersService.user_otp_created(otpCreateDtoUser, res)
    }

    @ApiOperation({ summary: "find active users" })
    @ApiResponse({ status: 200, type: [ Users ] })
    @Get('find-active')
    find_active_users(): Promise<Object> {
        return this.usersService.find_active_users()
    }

    @ApiOperation({ summary: "find not active users" })
    @ApiResponse({ status: 200, type: [ Users ] })
    @Get('find-not-active')
    find_not_active_users(): Promise<Object> {
        return this.usersService.find_not_active_users()
    }

    @ApiOperation({summary:"find one user"})
    @ApiResponse({status:200,type:Users})
    @Get(':id')
    find_user(
        @Param('id') id: number
    ): Promise<Object> {
        return this.usersService.find_user(id)
    }

    @ApiOperation({summary:"update one user"})
    @ApiResponse({status:200,type:Users})
    @Put('update/:id')
    update_user_date(
        @Param('id') id: number,
        @Body() updateDateDto: UpdateDateDto
    ): Promise<Object> {
        return this.usersService.update_user_date(id, updateDateDto)
    }

    @ApiOperation({summary:"remove one user"})
    @ApiResponse({status:200})
    @Delete('remove/:id')
    remove_user(
        @Param('id') id: number,
    ): Promise<Object | Number>{
        return this.usersService.remove_user(id)
    }

    @ApiOperation({summary: 'update active user'})
    @ApiResponse({status: 200, type: Users})
    @Get('actived-or-notactivated/:id')
    active(
      @Param('id') id: number
    ): Promise<Object> {
      return this.usersService.active(id)
    }
}