
import { Controller, Get, Post, Body, Query,Req,Patch, Param, Delete,UseGuards,UsePipes } from '@nestjs/common';
import { Responser } from '@app/decorators/responser.decorator';
import { TaskAddDTO,TaskQueryDTO,TaskDelDTO ,TaskUpdateDTO} from './task.dto';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '@app/guards/jwt.auth.guard';
import { QueryParams, QueryParamsResult } from '@app/decorators/queryparams.decorator';
import { formatNum } from '@app/utils/index'

@Controller()
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {};

  @Post('/task_add')
  @Responser.handle('post task_add')
  addTask(@Body() newTaskInfo: TaskAddDTO) {
    return this.taskService.addTask(newTaskInfo);
  }

  @Post('/task_del')
  @Responser.handle('post task_del')
  delTask(@Body() delTaskParams: TaskDelDTO) {
    return this.taskService.delTask(delTaskParams);
  }

  @Post('/task_update')
  @Responser.handle('post task_update')
  updateTask(@Body() updateTaskParams: TaskUpdateDTO) {
    return this.taskService.updateTask(updateTaskParams);
  }

  
  @Get('/task_list')
  @Responser.handle('get task_list')
  getTaskList(@Query() taskQuery: TaskQueryDTO) {

    try {
      const { pStatus } = taskQuery;
      const [ pStatusNo ] = formatNum(pStatus);
      const taskList =  this.taskService.getTaskList({
        pStatus:pStatusNo
      });

      return taskList;
    } catch (err) {
      console.error(err);
    }
  
  }

}


