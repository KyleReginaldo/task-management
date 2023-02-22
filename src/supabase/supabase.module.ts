import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Supabase } from './supabase';
import { SupabaseStrategy } from './supabase.strategy';
import { SupabaseGuard } from './supabase.guard';

@Module({
  imports: [ConfigModule],
  providers: [Supabase, SupabaseStrategy, SupabaseGuard],
  exports: [Supabase, SupabaseStrategy, SupabaseGuard],
})
export class SupabaseModule {}
