import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class PhoneUserDto{
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber:string
}