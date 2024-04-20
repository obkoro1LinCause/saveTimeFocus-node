import { compareSync } from 'bcryptjs';
import { Inject ,BadRequestException,Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { ValidationError } from '@app/errors/validation.error';
import { UserService } from '@app/module/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
   ) {
   
    super({
      usernameField: 'email',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  // 鉴权 验证策略
  async validate(email: string, password: string) {
    const user = await this.userService.findUserByField(email,'email');
    
    if (!user) {
        throw new ValidationError('emailERR')
    }
    if (!compareSync(password, user.password)) {
        throw new ValidationError('passwordERR');
    }
    
    return user;
  }
}