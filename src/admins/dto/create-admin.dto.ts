import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateAdminDto{
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password:string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    confirm_password:string
}