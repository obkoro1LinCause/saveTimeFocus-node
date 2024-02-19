
import { Controller, Get, Post, Body, Query,Req,Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { RegisterDto,BaseDto,EmailDto,UserDto,IdDto,TokenDto } from './user.dto';
import { Responser } from '@app/decorators/responser.decorator';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '@app/guards/jwt.auth.guard';
import { LocalAuthGuard } from '@app/guards/local.auth.guard';
import { QueryParams, QueryVisitor } from '@app/decorators/queryparams.decorator';
import { ReqParams,ReqParamsResult } from '@app/decorators/reqParams.decorator'

/**
 * post 接口返回 http status 201
 * get 接口返回 http status 200
 */
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {};

  // 注册
  @Post('/user_register')
  @Responser.handle('post  register_user')
  register(@Body()registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }

  // 登陆
  @UseGuards(LocalAuthGuard)
  @Post('/user_login')
  @Responser.handle('post login')
  login(@Body()loginDto: BaseDto,@ReqParams('user') user:ReqParamsResult) {
    return this.userService.loginUser(loginDto,user);
  }

  // 修改密码
  @UseGuards(JwtAuthGuard)
  @Post('/user_change_password')
  @Responser.handle('post  user_change_password')
  change(@Body()userDto: BaseDto,@ReqParams('user') user:ReqParamsResult) {
    return this.userService.changePassword(userDto,user);
  }

  // 发送邮箱验证码
  @Get('/user_email_code')
  @Responser.handle('get user_email_code')
  sendEmailCode(@Query() email:EmailDto){
    return this.userService.sendEmailCode(email);
  }

  // 获取用户信息列表
  @UseGuards(JwtAuthGuard)
  @Get('/user_list')
  @Responser.handle('get user_list')
  findUsers(){
    return this.userService.findAllUsers();
  }

  // 获取用户信息
  @UseGuards(JwtAuthGuard)
  @Post('/user')
  @Responser.handle('post user')
  findUser(@Body()userDto: UserDto){
    return this.userService.findUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user_by_token')
  @Responser.handle('get user_by_token')
  findUserByToken(@Query() token:TokenDto){
    console.log(token,'====token====');
    return this.userService.findOneUserByToken(token.token);
  };

}
