import { v4 } from "uuid"
import * as bcrypt from 'bcrypt'
import { Response } from 'express';
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as otpGenerator from "otp-generator"
import { SmsService } from './../sms/sms.service';
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, ForbiddenException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';

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

    async userRegister(createUserDto:CreateUserDto,res:Response) {
        const { phone } = createUserDto
        
        const [ user ] =  await this.userRepository.findBy({ phone: createUserDto.phone })
        
        if(user){
            throw new BadRequestException("PhoneNumber already exists")
        }


        const newUser = await this.userRepository.create({
            ...createUserDto,
            is_block:false
        })
        
        const uniquKey:string = v4()
        const updateUser = await this.userRepository.save(
            {
                ...createUserDto,
                hashed_refresh_token:null,
            }
        )
        const f = await this.newOTP({phoneNumber:phone})

        const updateUserFind = await this.userRepository.findBy({id:newUser.id})
        
        return {
            message:"User registeried successfully",
            user:updateUserFind
        };
    }

    async userLogin(loginDtoUser:PhoneUserDto,res:Response) {
        const [findUser] = await this.userRepository.find({where:{phone:loginDtoUser.phoneNumber}})
        if(!findUser){
            throw new NotFoundException("This Phone Number is not yet registered")
        }
        if(findUser.is_block==true){
            throw new BadRequestException("User is Block User")
        }

        const f = await this.newOTP({phoneNumber:loginDtoUser.phoneNumber})
        return {
            message:"You have been sent an login code",
        };

    }

    async userOtpLogin(loginDtoUser:LoginDtoUser,res:Response) {
        const [findUser] = await this.userRepository.find({where:{phone:loginDtoUser.phoneNumber}})
        if(!findUser){
            throw new NotFoundException("This Phone Number is not yet registered")
        }
        if(findUser.is_block==true){
            throw new BadRequestException("User is Blocked")
        }

        const [OtpcheckUser] = await this.otpRepository.find({where:{check:loginDtoUser.phoneNumber}})
        
        if(OtpcheckUser.verified==true){
            throw new BadRequestException("Get another code that this code was previously used for")
        }

        if(OtpcheckUser.otp!==loginDtoUser.otp){
            throw new NotFoundException("Otp is error")
        }
        
        const tokens = await this.getTokens(findUser)

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)

        const otpCheckVerified = await this.otpRepository.update({check:loginDtoUser.phoneNumber},{verified:true})
        const updateUserFind = await this.userRepository.update({id:findUser.id},{hashed_refresh_token:hashed_refresh_token})
        const findUpdateUser = await this.userRepository.findBy({id:findUser.id})
        
        res.cookie('refresh_token',tokens.refresh_token,{
            maxAge:15*24*60*60*1000,
            httpOnly:true,
        })
        return {
            message:"User Login successfully",
            user:findUpdateUser,
            token:tokens
        };

    }

    async userlogout(refereshToken:string,res:Response){
        console.log(0);
        const userData = await this.jwtService.verify(refereshToken,{
            secret:process.env.REFRESH_TOKEN_KEY_PERSON
        })
        console.log(userData);
        
        if(!userData){
            throw new ForbiddenException("User not found")
        }
        console.log(1);
        
        const updateUser = await this.userRepository.update(
            {id:userData.id},
            {hashed_refresh_token:null},
        )
        console.log(2);
        res.clearCookie('refresh_token')
        console.log(3);
        return {
            message:"User logged out successful",
            user:userData
        }
    }

    async getallusers() {
        const findallUser = await this.userRepository.find()
        if(!findallUser){
            throw new NotFoundException("Users not found")
        }
        return {
            message:"Users found successfully",
            users:findallUser
        }
    }

    async getoneuser(id:number) {
        const [findoneUser] = await this.userRepository.find({where:{id:id}})
        if(!findoneUser){
            throw new NotFoundException("User not found")
        }
        return {
            message:"Users found successfully",
            user:findoneUser
        }
    }

    async updateuser(id:number, updateUserDto:UpdateUserDto) {
        const [findoneUser] = await this.userRepository.find({where:{id:id}})
        if(!findoneUser){
            throw new NotFoundException("User not found")
        }

        const updateUser = await this.userRepository.update({id:id},{...updateUserDto})
        const [findUpdateuser] = await this.userRepository.find({where:{id:id}})
        return {
            message:"Users updated successfully",
            user:findUpdateuser
        }

    }

    async deleteuser(id:number){
        const [findoneUser] = await this.userRepository.find({where:{id:id}})
        if(!findoneUser){
            throw new NotFoundException("User not found")
        }
        const deleteoneUser = await this.userRepository.delete({id:id})
        return {
            message:"Users deleted successfully",
            user:findoneUser
        }
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

    async getTokens(user:Users){
        const jwtPayload={
            id:user.id,
            is_block:user.is_block,
        }
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