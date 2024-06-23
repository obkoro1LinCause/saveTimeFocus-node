
import { Controller, Get, Post, Body, Query,Req,Patch, Param, Delete,UseGuards,UsePipes } from '@nestjs/common';
import { UserInfoDTO,RegisterDTO,EmailDTO } from '@app/module/user/user.dto';
import { Responser } from '@app/decorators/responser.decorator';
import { UserService } from '@app/module/user/user.service';
import { JwtAuthGuard } from '@app/guards/jwt.auth.guard';
import { LocalAuthGuard } from '@app/guards/local.auth.guard';
import { QueryParams,User } from '@app/decorators/queryparams.decorator';


@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {};

  // 注册
  @Post('/user_register')
  @Responser.handle('post  register_user')
  register(@Body() user: RegisterDTO) {
    return this.userService.createUser(user);
  }
  // 修改密码
  @Post('/change_password')
  @Responser.handle('post change_password')
  change(@Body() user: UserInfoDTO) {
    return this.userService.changePassword(user);
  }
  // 登陆
  @UseGuards(LocalAuthGuard)
  @Post('/user_login')
  @Responser.handle('post login')
  login(@Body() user: UserInfoDTO, @QueryParams('user') { id }: User) {
    return this.userService.loginUser(user,id);
  }

  // 发送邮箱验证码
  @Get('/email_code')
  @Responser.handle('get email_code')
  sendEmailCode(@Query() { email }:EmailDTO){
    return this.userService.sendEmailCode(email);
  }

  // 获取用户信息列表 @QueryParams(){ isAuthenticated }
  @UseGuards(JwtAuthGuard)
  @Get('/user_list')
  @Responser.handle('get user_list')
  findUsers(){
    return this.userService.findAllUsers();
  }

  // 获取用户信息
  @UseGuards(JwtAuthGuard)
  @Get('/current_user')
  @Responser.handle('get current_user')
  getCurrentUser(@QueryParams('user') user:User){
    return user;
  }

  // 注销
  @UseGuards(JwtAuthGuard)
  @Get('/user_logout')
  @Responser.handle('get user_logout')
  logout(@QueryParams('user') user:User){
    const { email,id }:any = user;
    return this.userService.logoutUser(id);
  };
}


