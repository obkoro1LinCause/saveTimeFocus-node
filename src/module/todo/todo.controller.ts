import { Controller, Get, Post, Body, Patch, Query, Delete,UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { ListAddDTO,TaskAddDTO,QueryDTO } from './todo.dto';
import { Responser } from '@app/decorators/responser.decorator';
import { ReqParams, User } from '@app/decorators/reqParams.decorator'
import { JwtAuthGuard } from '@app/guards/jwt.auth.guard';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // 创建清单|| 清单文件夹
  @UseGuards(JwtAuthGuard)
  @Post('/todo_list_add')
  @Responser.handle('post todo_list_add')
  creatList(@Body() list:ListAddDTO,@ReqParams('user') user:User) {
    return this.todoService.creatList(list,user);
  }

  // 创建任务
  @UseGuards(JwtAuthGuard)
  @Post('/todo_task_add')
  @Responser.handle('post todo_task_add')
  createTask(@Body() task:TaskAddDTO,@ReqParams('user') user:User) {
    return this.todoService.createTask(task,user);
  }

  // 创建标签
  @UseGuards(JwtAuthGuard)
  @Post('/todo_tag_add')
  @Responser.handle('post  todo_tag_add')
  createTag(@Body() taskBody,@ReqParams('user') user:User) {
    return this.todoService.createTag();
  }
  //list查询
  @UseGuards(JwtAuthGuard)
  @Get('/todo_query_list')
  @Responser.handle('post  todo_query_list')
  todoQueryList(@Query() query:QueryDTO,@ReqParams('user') user:User) {
    return this.todoService.todoQueryList(query,user);
  }
}
