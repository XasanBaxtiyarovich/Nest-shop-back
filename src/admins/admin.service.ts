
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException, ForbiddenException, HttpStatus, NotFoundException, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { v4} from "uuid"
import { Response } from 'express';
import { Admin } from './entites/admin.entites';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { NewPasswordDto } from "./dto/new-password";

export class AdminService {
    constructor(
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        private jwtService: JwtService
    ) {}

    async getTokens(admin:Admin){
        
        const jwtPayload={
            id:admin.id,
            is_block:admin.is_block,
        }
        const [accessToken,refreshToken] = await Promise.all([
            
            this.jwtService.signAsync(jwtPayload,{
                secret:process.env.ADMIN_ACCES_TOKEN_KEY_PERSON,
                expiresIn:process.env.ADMIN_ACCESS_TOKEN_TIME
            }),
            
            this.jwtService.signAsync(jwtPayload,{
                secret:process.env.ADMIN_REFRESH_TOKEN_KEY_PERSON,
                expiresIn:process.env.ADMIN_REFRESH_TOKEN_TIME
            }),
        ])
        
        return {
            access_token:accessToken,
            refresh_token:refreshToken
        }  
    }

    async adminRegister(createAdminDto:CreateAdminDto,res:Response) {
        
        const [admin] =  await this.adminRepository.findBy({username: createAdminDto.username})
        
        if(admin){
            throw new BadRequestException("Username already exists")
        }


        const newUser = await this.adminRepository.create({
            ...createAdminDto,
            is_block:false
        })
        
        const uniquKey:string = v4()
        const hashed_password = await bcrypt.hash(createAdminDto.password,7)
        const updateUser = await this.adminRepository.save(
            {
                ...createAdminDto,
                hashed_password:hashed_password,
                hashed_refresh_token:null,
            }
        )

        const updateUserFind = await this.adminRepository.findBy({id:newUser.id})
        
        return {
            message:"User registeried successfully",
            user:updateUserFind
        };
    }

    async adminLogin(loginAdminDto:LoginAdminDto,res:Response) {
        const [findAdmin] = await this.adminRepository.find({where:{username:loginAdminDto.username}})
        if(!findAdmin){
            throw new NotFoundException("This Username does not exist")
        }
        if(findAdmin.is_block==true){
            throw new BadRequestException("Admin is Block User")
        }
        const is_Match = await bcrypt.compare(loginAdminDto.password,findAdmin.hashed_password)

        if(!is_Match){
            throw new UnauthorizedException("Username or password incorrect")
        }


        const tokens = await this.getTokens(findAdmin)

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)

        const updateAdmin = await this.adminRepository.update(
            {id:findAdmin.id},
            {hashed_refresh_token:hashed_refresh_token},
        )
        const findUpdateAdmin = await this.adminRepository.findBy({id:findAdmin.id})

        res.cookie('refresh_token',tokens.refresh_token,{
            maxAge:15*24*60*60*1000,
            httpOnly:true
        })

        return {
            message:"Admin Logged in Successfully",
            admin:findUpdateAdmin,
            tokens:tokens
        };

    }

    async newPassword(id:number,newPasswordDto:NewPasswordDto){
        const [findAdmin] = await this.adminRepository.findBy({id:id})

        if(!findAdmin) {
            throw new NotFoundException("Admin not found")
        }

        if(findAdmin.is_block==true){
            throw new BadRequestException("Admin is Block")
        }
        
        const  is_Match = await bcrypt.compare(newPasswordDto.old_password,findAdmin.hashed_password)

        if(!is_Match){
            return {
                message:"Password not match",
                status:HttpStatus.CONFLICT
            }
        }

        if(newPasswordDto.new_password !== newPasswordDto.new_confirm_password){
            return {
                message:"Password and Confirm Password not match",
                status:HttpStatus.UNAUTHORIZED
            }
        }

        const hashed_password = await bcrypt.hash(newPasswordDto.new_password,7)

        await this.adminRepository.update({id:id},{hashed_password:hashed_password})
        const findUpdateAdmin = await this.adminRepository.findBy({id:id})

        return {
            message:"New password successfully updated",
            admin:findUpdateAdmin,
            status:HttpStatus.OK
        }

    }

    async adminlogout(refereshToken:string,res:Response){
        console.log(0);
        const userData = await this.jwtService.verify(refereshToken,{
            secret:process.env.ADMIN_REFRESH_TOKEN_KEY_PERSON
        })
        console.log(userData);
        
        if(!userData){
            throw new ForbiddenException("User not found")
        }
        console.log(1);
        
        const updateUser = await this.adminRepository.update(
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

    async getalladmins() {
        const findallAdmin = await this.adminRepository.find()
        if(!findallAdmin){
            throw new NotFoundException("Admins not found")
        }
        return {
            message:"Admins found successfully",
            users:findallAdmin
        }
    }

    async getoneadmin(id:number) {
        const [findoneAdmin] = await this.adminRepository.find({where:{id:id}})
        if(!findoneAdmin){
            throw new NotFoundException("Admin not found")
        }
        return {
            message:"Admin found successfully",
            user:findoneAdmin
        }
    }

    async updateAdmin(id:number, updateAdminDto:UpdateAdminDto) {
        const [findoneAdmin] = await this.adminRepository.find({where:{id:id}})
        if(!findoneAdmin){
            throw new NotFoundException("Admin not found")
        }

        const updateAdmin = await this.adminRepository.update({id:id},{...updateAdminDto})
        const [findUpdateAdmin] = await this.adminRepository.find({where:{id:id}})
        return {
            message:"Admin updated successfully",
            user:findUpdateAdmin
        }

    }

    async deleteAdmin(id:number){
        const [findoneAdmin] = await this.adminRepository.find({where:{id:id}})
        if(!findoneAdmin){
            throw new NotFoundException("Admin not found")
        }
        const deleteoneUser = await this.adminRepository.delete({id:id})
        return {
            message:"Admin deleted successfully",
            user:findoneAdmin
        }
    }


}