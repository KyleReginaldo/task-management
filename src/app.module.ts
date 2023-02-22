import { Module } from '@nestjs/common';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SupabaseModule,
    ConfigModule.forRoot(),
    PassportModule,
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
