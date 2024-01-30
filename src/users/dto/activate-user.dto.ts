import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class ActiveUserDto{
    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    phonenumber:string;

    @IsString()
    @IsNotEmpty()
    otp:string;
}