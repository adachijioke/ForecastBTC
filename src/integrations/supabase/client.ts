import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jgjixdaxwuawxcgfomfy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnaml4ZGF4d3Vhd3hjZ2ZvbWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNTg2ODksImV4cCI6MjA3MDkzNDY4OX0.MzYuu4lMkJEna_T-W1jEHW6CD0Ht_iaOMIcdIGZLUd0";


// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});