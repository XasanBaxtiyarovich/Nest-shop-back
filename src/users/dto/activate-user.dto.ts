import {IsNotEmpty, IsString} from "class-validator"

export class ActiveUserDto{
    @IsString()
    @IsNotEmpty()
    phonenumber:string;

    @IsString()
    @IsNotEmpty()
    otp:string;
}