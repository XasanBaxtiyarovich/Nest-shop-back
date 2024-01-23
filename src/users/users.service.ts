import { v4 } from "uuid"
import * as bcrypt from 'bcrypt'
import { Response } from 'express';
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as otpGenerator from "otp-generator"
import { SmsService } from './../sms/sms.service';
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus, ServiceUnavailableException } from '@nestjs/common';

import { Users } from "./entities";
import { Otp } from '../otp/entites';
import { PhoneUserDto } from './dto';
import { encode } from '../helpers/crypto';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { CreateUserDto, LoginDtoUser, UpdateUserDto } from './dto';


export class UsersService {
    constructor(
        @InjectRepository(Otp) private otpRepository: Repository<Otp>,
        @InjectRepository(Users) private userRepository: Repository<Users>,
        private smsService:SmsService,
        private jwtService: JwtService,
    ) {}

    async user_signup(createUserDto:CreateUserDto): Promise<Object> {
        const { phone } = createUserDto;
        const [ user ] =  await this.userRepository.findBy({ phone: createUserDto.phone });
        
        if(user) {
            return {
                status: HttpStatus.CONFLICT,
                message: "Phone number already exists"
            }
        }

        const new_user  = await this.userRepository.save({ ...createUserDto, hashed_refresh_token: null });

        await this.newOTP({ phoneNumber: phone });
        
        return {
            message:"User signup successfully",
            user: new_user
        };
    }

    async user_signin(loginDtoUser:PhoneUserDto): Promise<Object> {
        const [ user ] = await this.userRepository.findBy({ phone:loginDtoUser.phoneNumber });
        if(!user) {
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'User not found'
            }
        }

        if(user.is_block === true) {
            return {
                status: HttpStatus.FORBIDDEN,
                message: 'User is blocked'
            }
        }

        await this.newOTP({ phoneNumber: loginDtoUser.phoneNumber });

        return {
            status: HttpStatus.OK,
            message:"You have been sent an login code",
        };

    }

    async user_otp_created(loginDtoUser: LoginDtoUser, res: Response): Promise<Object> {
        const [ user ] = await this.userRepository.findBy({ phone: loginDtoUser.phoneNumber });
        if(!user) {
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'This Phone Number is not yet registered'
            }
        }

        if(user.is_block === true) {
            return {
                status: HttpStatus.FORBIDDEN,
                message: 'User is blocked'
            }
        }

        const [ otp_check ] = await this.otpRepository.findBy({ check:loginDtoUser.phoneNumber });
        
        if(otp_check.verified === true) {
            return {
                status: HttpStatus.CONFLICT,
                message: 'Get another code that this code was previously used for'
            }
        }

        if(otp_check.otp !== loginDtoUser.otp) {
            return {
                status: HttpStatus.CONFLICT,
                message: 'OTP Error'
            }
        }
        
        const tokens = await this.getTokens(user);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)

        await this.otpRepository.update({ check: loginDtoUser.phoneNumber }, { verified: true });
        await this.userRepository.update({id: user.id }, { hashed_refresh_token: hashed_refresh_token });

        const logined_user = await this.userRepository.findBy({ id: user.id });
        
        res.cookie('refresh_token',tokens.refresh_token,{
            maxAge:15*24*60*60*1000,
            httpOnly:true,
        })

        return {
            status: HttpStatus.OK,
            user: logined_user,
            token: tokens
        };
    }

    async find_users(): Promise<Object> {
        const users = await this.userRepository.find()
        if(users.length === 0){
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'Users not found'
            }
        }

        return {
            status: HttpStatus.OK,
            users
        }
    }

    async find_user(id: number): Promise<Object> {
        const [ user ] = await this.userRepository.findBy({ id });
        if(!user){
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'User not found'
            }
        }

        return {
            status: HttpStatus.OK,
            user
        }
    }

    async update_user(id: number, updateUserDto: UpdateUserDto): Promise<Object> {
        const [ user ] = await this.userRepository.findBy({ id });
        if(!user){
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'User not found'
            }
        }

        const updated_user = await this.userRepository.update({ id }, { ...updateUserDto });

        return {
            status: HttpStatus.OK,
            updated_user
        }

    }

    async remove_user(id: number): Promise<Object | HttpStatus> {
        const [ user ] = await this.userRepository.findBy({ id });
        if(!user){
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'User not found'
            }
        }

        await this.userRepository.delete({ id });

        return HttpStatus.OK;
    }

    async newOTP(phoneUserDto: PhoneUserDto){
        const phone_number = phoneUserDto.phoneNumber
        const otp = otpGenerator.generate(4,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars:false
        })
        
        const resp = await this.smsService.SendSMS(phone_number.slice(1),otp)
        
        if(!resp){
            throw new ServiceUnavailableException("OTP jonatilmadi")
        }
        const message = "Code has been to ***** "+ phone_number.slice(phone_number.length-4)

        
        const now  = new Date()
        const expiration_time = AddMinutesToDate(now,5)
        const findCheck = await this.otpRepository.findBy({check:phone_number})
        if(findCheck){
            await this.otpRepository.delete(
                {check:phone_number}
            )
        }

        const newOtp = await this.otpRepository.save({
            otp_id:v4(),
            otp,
            expiration_time,
            check:phone_number
        })

        const details = {
            timestamp:now,
            check:phone_number,
            succes:true,
            message:"Otp sent to User",
            otp_id:newOtp.id
        }
        const encoded = await encode(JSON.stringify(details))
        return {status:'Success',Details:encoded,message}
    }

    async getTokens(user: Users){
        const jwtPayload={ id: user.id, is_block: user.is_block };

        const [accessToken,refreshToken] = await Promise.all([    
            this.jwtService.signAsync(jwtPayload,{
                secret:process.env.ACCES_TOKEN_KEY_PERSON,
                expiresIn:process.env.ACCESS_TOKEN_TIME
            }),
            
            this.jwtService.signAsync(jwtPayload,{
                secret:process.env.REFRESH_TOKEN_KEY_PERSON,
                expiresIn:process.env.REFRESH_TOKEN_TIME
            }),
        ])
        
        return {
            access_token:accessToken,
            refresh_token:refreshToken
        }  
    }
}