import { FilesService } from './../files/files.service';
import { SmsService } from './../sms/sms.service';
import { LoginDtoUser } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-users.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entities/users.entities";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException, ForbiddenException, NotFoundException, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { v4} from "uuid"
import * as otpGenerator from "otp-generator"
import { Response } from 'express';
import { PhoneUserDto } from './dto/Otp-create.dto';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { Otp } from '../otp/entites/create-otp.dto';
import { encode } from '../helpers/crypto';
import { ActiveUserDto } from './dto/activate-user.dto';

export class UsersService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
        @InjectRepository(Otp) private otpRepository: Repository<Otp>,
        private jwtService: JwtService,
        private smsService:SmsService,
        private filesService:FilesService
    ) {}

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

    async userRegister(createUserDto:CreateUserDto,res:Response) {
        const {phone} = createUserDto
        console.log(createUserDto);
        
        const [user] =  await this.userRepository.findBy({phone: createUserDto.phone})
        
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



    // async useractivate(activeUserDto:ActiveUserDto,res:Response) {
    //     const [findUserPhoneNumber] = await this.userRepository.find({where:{phone:activeUserDto.phonenumber}})
    //     if(!findUserPhoneNumber){
    //         throw new NotFoundException("This Phone Number is not yet registered");
    //     }
    //     if(findUserPhoneNumber.is_block === false){
    //         throw new BadRequestException("User already activated")
    //     }
    //     const [findOtpPhoneNumber] = await this.otpRepository.find({where:{check:activeUserDto.phonenumber}})
    //     if(!findOtpPhoneNumber){
    //         throw new NotFoundException("Phone number not found")
    //     }
    //     if(findOtpPhoneNumber.otp !== activeUserDto.otp){
    //         throw new BadRequestException("Otp Code Not Match")
    //     } 
    //     const [findUser] = await this.userRepository.find({where:{phone:activeUserDto.phonenumber}})
    //     console.log(findUser);
        
    //     return {
    //         message:"User activated",
    //         user:findUser
    //     }
    // }

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
}