import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDtoUser{
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;


    @IsString()
    @IsNotEmpty()
    otp: string;
}