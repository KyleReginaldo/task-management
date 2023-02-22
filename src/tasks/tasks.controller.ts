import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dtos/create-task.dto';
import { Task } from 'src/model/task.model';
import { TaskWithUser } from 'src/model/task-with-user.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }
  @Get()
  async getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }
  @Get('users')
  async getUsersInTasks(): Promise<TaskWithUser[]> {
    return this.tasksService.getUsersInTasks();
  }
}
