import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dtos/auth.dto';
import { Supabase } from 'src/supabase/supabase';

@Injectable()
export class AuthService {
  constructor(private readonly supabase: Supabase) {}
  async register(authDto: AuthDto) {
    const { email, password, username } = authDto;
    const { data, error } = await this.supabase
      .getClient()
      .auth.admin.createUser({ email: email, password: password });
    if (error) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    await this.supabase.getClient().from('users').insert({
      id: data.user.id,
      email: email,
      password: password,
      username: username,
    });
  }
}
