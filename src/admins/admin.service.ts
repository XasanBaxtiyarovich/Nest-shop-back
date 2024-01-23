import * as bcrypt from 'bcrypt'
import { Response } from 'express';
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, HttpStatus, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { Admin } from './entites';
import { CreateAdminDto, LoginAdminDto, UpdateAdminDto, NewPasswordDto } from './dto';


export class AdminService {
    constructor(
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        private jwtService: JwtService
    ){}

    async adminRegister(createAdminDto:CreateAdminDto,res:Response) { 
        const [admin] =  await this.adminRepository.findBy({username: createAdminDto.username})
        
        if(admin){
            throw new BadRequestException("Username already exists")
        }


        const newUser = await this.adminRepository.create({
            ...createAdminDto,
            is_block:false
        })
        
        const hashed_password = await bcrypt.hash(createAdminDto.password,7)
        await this.adminRepository.save(
            {
                ...createAdminDto,
                hashed_password:hashed_password,
                hashed_refresh_token:null,
            }
        )

        const updateUserFind = await this.adminRepository.findBy({id: newUser.id})
        
        return {
            status: HttpStatus.OK,
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

    async getalladmins() {
        const admins = await this.adminRepository.find()
        if(admins.length === 0){
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'Admins Not Found'
            }
        }
        return {
            message:"Admins found successfully",
            admins
        }
    }

    async getoneadmin(id:number) {
        const [ admin ] = await this.adminRepository.findBy({ id });
        if(!admin){
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'Admin Not Found'
            }
        }

        return {
            message:"Admin found successfully",
            admin
        }
    }

    async updateAdminDate(id:number, updateAdminDto:UpdateAdminDto) {
        const [findoneAdmin] = await this.adminRepository.findBy({ id });
        if(!findoneAdmin){
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'Admin Not Found'
            }
        }

        await this.adminRepository.update({ id }, { ...updateAdminDto });
        const [findUpdateAdmin] = await this.adminRepository.findBy({ id });

        return {
            status: HttpStatus.OK,
            admin: findUpdateAdmin
        }

    }

    async updateAdminPassword(id:number,newPasswordDto:NewPasswordDto){
        const [ admin ] = await this.adminRepository.findBy({ id })

        if(!admin) {
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'Admin Not Found'
            }
        }

        if(admin.is_block==true){
            return {
                status: HttpStatus.CONFLICT,
                message: "Admin is Block"
            }
        }
        
        const is_Match = await bcrypt.compare(newPasswordDto.old_password, admin.hashed_password)

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

        const hashed_password = await bcrypt.hash(newPasswordDto.new_password,7);

        await this.adminRepository.update({ id }, { hashed_password:hashed_password });
        const findUpdateAdmin = await this.adminRepository.findBy({id})

        return {
            status:HttpStatus.OK,
            admin:findUpdateAdmin
        }

    }

    async deleteAdmin(id:number){
        const [findoneAdmin] = await this.adminRepository.find({where:{id:id}})
        if(!findoneAdmin){
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'Admin Not Found'
            }
        }

        await this.adminRepository.delete({ id });

        return HttpStatus.OK;
    }









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
}