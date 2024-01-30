import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class UpdateAdminDto{
    @ApiProperty({example:"username" ,description:"Admin username"})
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @ApiProperty({example:"John" ,description:"Admin firstname"})
    firstname?: string;

    @ApiProperty({example:"Doe" ,description:"Admin lastname"})
    lastname?: string
}