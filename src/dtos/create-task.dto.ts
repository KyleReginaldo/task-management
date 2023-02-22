import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  @IsUUID()
  userId: string;
}
