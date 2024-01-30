import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber:string
}