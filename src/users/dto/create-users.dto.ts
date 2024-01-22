import {IsNotEmpty, IsString, MinLength} from "class-validator"

export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    phone:string;


}