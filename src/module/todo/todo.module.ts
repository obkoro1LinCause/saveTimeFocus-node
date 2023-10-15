import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TaskListProvider,TaskProvider,TagProvider } from '@app/module'

@Module({
  controllers: [TodoController],
  providers: [TodoService,TaskListProvider,TaskProvider,TagProvider]
})
export class TodoModule {}
