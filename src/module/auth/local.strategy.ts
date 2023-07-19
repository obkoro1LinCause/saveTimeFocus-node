import { compareSync } from 'bcryptjs';
import { Inject ,BadRequestException,Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { ValidationError } from '@app/errors/validation.error';
import { AuthService } from '@app/module/auth/auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly AuthService: AuthService,
   ) {
   
    super({
      usernameField: 'email',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(email: string, password: string) {
    // TODO:改造将调用查数据库的提取到authService
    const user = await this.AuthService.getUser(email,password);

    if (!user) {
        throw  new ValidationError('用户名不正确!')
    }
    if (!compareSync(password, user.password)) {
        throw new ValidationError('密码错误！!')
    }
  
    return user;
  }
}