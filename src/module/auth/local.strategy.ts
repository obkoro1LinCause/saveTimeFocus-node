import { compareSync } from 'bcryptjs';
import { Inject ,BadRequestException,Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { ValidationError } from '@app/errors/validation.error';
import { AuthService } from '@app/module/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
   ) {
   
    super({
      usernameField: 'email',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(email: string, password: string) {
    const user = await this.authService.getUser(email);
    if (!user) {
        throw new ValidationError('用户名不正确!')
    }
    if (!compareSync(password, user.password)) {
        throw new ValidationError('密码错误 !')
    }
    return user;
  }
}