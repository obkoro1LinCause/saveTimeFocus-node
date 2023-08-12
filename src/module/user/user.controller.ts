
import { Controller, Get, Post, Body, Query,Req,Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { RegisterDto,BaseDto,EmailDto} from './user.dto';
import { Responser } from '@app/decorators/responser.decorator';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/guards/jwt.auth.guard';
import { LocalAuthGuard } from '@app/guards/local.auth.guard';
import { QueryParams, QueryVisitor } from '@app/decorators/queryparams.decorator';
import { ReqParams,ReqParamsResult } from '@app/decorators/reqParams.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {};

  @Post('/register')
  @Responser.handle('post  register_user')
  register(@Body()registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @Responser.handle('post login')
  login(@Body()loginDto: BaseDto) {
    console.log('-1-1--1',loginDto)
    return this.userService.loginUser(loginDto);
  }

  // TODO:需要正式页面试一试
  @UseGuards(JwtAuthGuard)
  @Post('/change_password')
  @Responser.handle('post  change_password_user')
  change(@Body()userDto: BaseDto,@ReqParams('user') user:ReqParamsResult) {
    return this.userService.changePassword(userDto,user);
  }

  @Get('/send_email_code')
  @Responser.handle('get send_email_code')
  sendEmailCode(@Query()email:EmailDto){
    this.userService.sendEmailCode(email);
  }



  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/find_users')
  @Responser.handle('get find_users')
  find(){
    return this.userService.findAllUsers();
  }
}
