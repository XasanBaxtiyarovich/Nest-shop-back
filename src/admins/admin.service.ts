import * as bcrypt from 'bcrypt'
import { Response } from 'express';
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";

import { Admin } from './entites';
import { CreateAdminDto, LoginAdminDto, UpdateAdminDto, NewPasswordDto } from './dto';


export class AdminService {
    constructor(
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        private jwtService: JwtService
    ){}

    async admin_signup(createAdminDto: CreateAdminDto): Promise<Object> { 
        const [ admin ] =  await this.adminRepository.findBy({ username: createAdminDto.username });
        if(admin){
            return {
                status: HttpStatus.CONFLICT,
                message: "Username already exists"
            }
        }
        
        const hashed_password = await bcrypt.hash(createAdminDto.password, 7);

        const new_admin = await this.adminRepository.save(
            {
                username: createAdminDto.username,
                hashed_password: hashed_password,
                hashed_refresh_token: null,
            }
        )

        return {
            status: HttpStatus.OK,
            admin: new_admin 
        };
    }

    async admin_signin(loginAdminDto: LoginAdminDto, res: Response): Promise<Object> {
        const [ admin ] = await this.adminRepository.findBy({ username: loginAdminDto.username });
        if(!admin) {
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'Admin not found'
            }
        }

        if(admin.is_block === true) {
            return {
                status: HttpStatus.FORBIDDEN,
                message: 'Admin is blocked'
            }
        }

        const pass = await bcrypt.compare(loginAdminDto.password, admin.hashed_password);

        if(!pass) {
            return {
                status: HttpStatus.FORBIDDEN,
                message: 'Username or password incorrect'
            }
        }

        const tokens = await this.getTokens(admin)

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)

        await this.adminRepository.update({ id: admin.id }, { hashed_refresh_token:hashed_refresh_token })
        
        const logined_admin = await this.adminRepository.findBy({ id: admin.id });

        res.cookie('refresh_token', tokens.refresh_token, {
            maxAge:15*24*60*60*1000,
            httpOnly:true
        })

        return {
            message:"Admin Logged in Successfully",
            admin: logined_admin,
            tokens:tokens
        };

    }

    async find_active_admins(): Promise<Object> {
        const admins = await this.adminRepository.find({ where: { is_block: false }});
        if(admins.length === 0){
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'Admins Not Found'
            }
        }

        return {
            status: HttpStatus.OK,
            admins
        }
    }

    async find_not_active_admins(): Promise<Object> {
        const admins = await this.adminRepository.find({ where: { is_block: true }});
        if(admins.length === 0){
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'Admins Not Found'
            }
        }

        return {
            status: HttpStatus.OK,
            admins
        }
    }

    async find_one_admin(id: number): Promise<Object> {
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

    async update_admin_date(id:number, updateAdminDto:UpdateAdminDto): Promise<Object> {
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

    async update_admin_pass(id:number,newPasswordDto:NewPasswordDto): Promise<Object> {
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

    async remove_admin(id: number): Promise<Object | HttpStatus> {
        const [ admin ] = await this.adminRepository.findBy({ id });
        if(!admin){
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'Admin Not Found'
            }
        }

        await this.adminRepository.delete({ id });

        return HttpStatus.OK;
    }
    
    async active(id: number): Promise<Object | HttpStatus> {
        const [ admin ] = await this.adminRepository.findBy({ id });
    
        if (!admin) {
          return {
            message: 'Admin Not Found',
            status: HttpStatus.NOT_FOUND
          };
        }
        
        if (admin.is_block) {
          await this.adminRepository.update({ id }, { is_block: false });
          return {
            message: 'Admin not blocked',
            status: HttpStatus.OK
          }
        } else {
          await this.adminRepository.update({ id }, { is_block: true });
          return {
            message: 'Admin blocked',
            status: HttpStatus.OK
          }
        }
    }

    async getTokens(admin:Admin){ 
        const jwtPayload = { id: admin.id, is_block: admin.is_block };

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