import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdatePassword{
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    old_password:string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    confirmpassword:string;
}