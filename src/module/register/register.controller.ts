import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterCreateDto } from './register.dto';
import { Responser } from '@app/decorators/responser.decorator'

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('/create_user')
  @Responser.handle('post register create_user') //接口message
  create(@Body()registerDto: RegisterCreateDto) {
    return this.registerService.create(registerDto);
  }

  @Get('/users')
  @Responser.handle('get register users')
  find(){
    return this.registerService.findAll();
  }
}
