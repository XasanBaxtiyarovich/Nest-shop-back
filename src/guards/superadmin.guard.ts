import { JwtService } from '@nestjs/jwt';
import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Admin } from '../admins/entites/admin.entites';



@Injectable()
export class UserGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService){}

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization
        if(!authHeader){
            throw new UnauthorizedException("Admin unauthorized.");
        }

        
        
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1]
        console.log(bearer);
        console.log(token);
        
        
        if(bearer !="Bearer" || !token){
            throw new Error("Admin unauthorized");   
        }

        
        
        async function verify(token: string,jwtService:JwtService){
            const admin:Partial<Admin> = await jwtService.verify(token,{
                secret:process.env.ACCESS_TOKEN_KEY,
            })

            if(!admin){
                throw new UnauthorizedException("Invalid token provided")
            }

            if(!admin.is_block){
                throw new BadRequestException("Admin is not active")
            }
            return true
        }
        return verify(token,this.jwtService)

    }
}
