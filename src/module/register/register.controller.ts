import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';
import { Responser } from '@app/decorators/responser.decorator'

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @Responser.handle('user post register') //接口message
  create(@Body()registerDto: RegisterDto) {
    return this.registerService.create(registerDto);
  }

  @Get()
  @Responser.handle('get users')
  find(){
    return this.registerService.findAll();
  }
}
