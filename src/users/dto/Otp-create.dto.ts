import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class PhoneUserDto{
    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber:string
}