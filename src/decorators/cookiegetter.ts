import { ExecutionContext, UnauthorizedException, createParamDecorator } from "@nestjs/common";


export const Cookiegetter = createParamDecorator(
    async (data:string,context:ExecutionContext):Promise<string> => {
        const request = context.switchToHttp().getRequest()
        const refreshToken = await request.cookies[data]
        console.log(refreshToken);
        
        if(!refreshToken) throw new UnauthorizedException('Token is not found');
        
        return refreshToken;

    }
)