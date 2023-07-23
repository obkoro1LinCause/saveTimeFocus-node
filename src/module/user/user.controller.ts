
import { Controller, Get, Post, Body, Req,Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { UserCreateDto } from './user.dto';
import { Responser } from '@app/decorators/responser.decorator';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/guards/jwt.auth.guard';
import { LocalAuthGuard } from '@app/guards/local.auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {};

  @Post('/create_user')
  @Responser.handle('post  create_user')
  create(@Body()registerDto: UserCreateDto) {
    return this.userService.createUser(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login_user')
  @Responser.handle('post login_user')
  login(@Body()loginDto: UserCreateDto,@Req() req) {
    return this.userService.loginUser(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/find_users')
  @Responser.handle('get find_users')
  find(){
    return this.userService.findAllUsers();
  }
}
