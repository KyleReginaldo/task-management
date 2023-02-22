import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [ConfigModule, SupabaseModule],

  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
