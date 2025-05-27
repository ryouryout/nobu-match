import { createClient } from '@supabase/supabase-js';

let supabase: any = null;

export const getSupabase = () => {
  if (typeof window !== 'undefined' && !supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabase;
};