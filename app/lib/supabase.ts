import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nbemhotlebykwhdzpmhn.supabase.co';
const supabaseAnonKey = 'sb_publishable_f4RhdoKQx--qPlj8WjBw2Q_xo_JBSr_';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);