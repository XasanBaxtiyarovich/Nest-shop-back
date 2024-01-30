import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class OtpCreateDto {
    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    otp: string;
}