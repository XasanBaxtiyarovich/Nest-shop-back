import { IsNotEmpty, IsPhoneNumber } from "class-validator"

export class CreateUserDto{
    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    phone: string;
}