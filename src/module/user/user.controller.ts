
import { Controller, Get, Post, Body, Query,Req,Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { RegisterDto,BaseDto,EmailDto} from './user.dto';
import { Responser } from '@app/decorators/responser.decorator';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '@app/guards/jwt.auth.guard';
import { LocalAuthGuard } from '@app/guards/local.auth.guard';
import { QueryParams, QueryVisitor } from '@app/decorators/queryparams.decorator';
import { ReqParams,ReqParamsResult } from '@app/decorators/reqParams.decorator'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {};

  @Post('/user_register')
  @Responser.handle('post  register_user')
  register(@Body()registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/user_login')
  @Responser.handle('post login')
  login(@Body()loginDto: BaseDto,@ReqParams('user') user:ReqParamsResult) {
    return this.userService.loginUser(loginDto,user);
  }

  // TODO:需要正式页面试一试
  @UseGuards(JwtAuthGuard)
  @Post('/user_change_password')
  @Responser.handle('post  user_change_password')
  change(@Body()userDto: BaseDto,@ReqParams('user') user:ReqParamsResult) {
    return this.userService.changePassword(userDto,user);
  }

  @Get('/user_email_code')
  @Responser.handle('get user_email_code')
  sendEmailCode(@Query()email:EmailDto){
    return this.userService.sendEmailCode(email);
  }



  @UseGuards(JwtAuthGuard)
  @Get('/user_list')
  @Responser.handle('get user_list')
  find(){
    return this.userService.findAllUsers();
  }
}
