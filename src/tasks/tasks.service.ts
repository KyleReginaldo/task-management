import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/dtos/create-task.dto';
import { Convert, TaskWithUser } from 'src/model/task-with-user.model';
import { Task } from 'src/model/task.model';
import { Supabase } from 'src/supabase/supabase';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TasksService {
  constructor(private readonly supabase: Supabase) {}
  async createTask(createTaskDto: CreateTaskDto) {
    const { title, content, userId } = createTaskDto;
    const { data, error } = await this.supabase
      .getClient()
      .from('tasks')
      .insert({
        id: uuid(),
        title: title,
        content: content,
        userId: userId,
      });
    if (error) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    console.log(data);
  }
  async getTasks(): Promise<Task[]> {
    const tasks: Task[] = [];
    const { data, error } = await this.supabase
      .getClient()
      .from('users')
      .select('*, tasks(*)');
    data.forEach((data) => {
      data['tasks'].forEach((_task) => {
        console.log(_task);
        const task: Task = {
          id: _task['id'],
          title: _task['title'],
          content: _task['content'],
          createAt: _task['create_at'],
          username: data['username'],
        };
        tasks.push(task);
      });
    });
    if (error) throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    return tasks;
  }
  async getUsersInTasks(): Promise<TaskWithUser[]> {
    const tasks: TaskWithUser[] = [];
    const { data, error } = await this.supabase
      .getClient()
      .from('tasks')
      .select('*, user:users(*)');
    console.log(typeof data);

    data.forEach((_task) => {
      const task = Convert.toTaskWithUser(JSON.stringify(_task));
      tasks.push(task);
    });
    if (error) throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    return tasks;
  }
}
