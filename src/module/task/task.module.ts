import { Module } from '@nestjs/common';
import { TaskDynamicModule } from '@app/module';
import { TaskController } from '@app/module/task/tast.controller';
import { TaskService } from '@app/module/task/task.service';



@Module({
  imports:[TaskDynamicModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports:[],
})
export class TaskModule {}
