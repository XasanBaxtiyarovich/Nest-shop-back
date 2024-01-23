import { IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    phone:string;
}