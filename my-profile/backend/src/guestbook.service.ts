import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GuestbookService {
  private supabase;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_KEY');

    if (!url || !key) {
      throw new Error('Supabase URL or KEY is missing in backend .env');
    }

    this.supabase = createClient(url, key);
  }

  async findAll() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async create(dto: any) {
    const { data, error } = await this.supabase.from('guestbook').insert([dto]);
    if (error) throw error;
    return data;
  }

  async update(id: string, dto: any) {
    const { data, error } = await this.supabase.from('guestbook').update(dto).eq('id', id);
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { data, error } = await this.supabase.from('guestbook').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
}
