import {IsNotEmpty, IsString} from "class-validator"

export class UpdateUserDto{
    firstname?:string;

    lastname?:string;

    address?:string;

}