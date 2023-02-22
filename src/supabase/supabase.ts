import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';

@Injectable({ scope: Scope.REQUEST })
export class Supabase {
  private readonly logger = new Logger(Supabase.name);
  private clientInstance: SupabaseClient;
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getClient() {
    this.logger.log('getting supabase client...');
    if (this.clientInstance) {
      this.logger.log('client exists - returning for current Scope.REQUEST');
      return this.clientInstance;
    }
    this.logger.log('initialising new supabase client for new Scope.REQUEST');
    this.clientInstance = createClient(process.env.URL, process.env.API_KEY, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: false,
        storageKey: ExtractJwt.fromAuthHeaderAsBearerToken()(this.request),
      },
    });
    console.log('initialization done.');

    return this.clientInstance;
  }
}
