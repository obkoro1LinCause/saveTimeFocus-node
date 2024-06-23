import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}
    // 生成token
    createToken(user):string {
        const payload = { ...user };
        return this.jwtService.sign(payload);
    }
    // token => user 
    async refreshTokenByOldToken(token:string):Promise<any>{
        const user = await this.jwtService.decode(token);
        return user;
    }
    // check token
    async checkToken(token: string): Promise<any> {
        const decode = await this.jwtService.verifyAsync(token);
        return decode;
    }
}