 import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function incrementVisitorCount() {
    const visitId = 1;

    // First, get the current count
    const { data: rows, error: selectError } = await supabase
      .from('visits')
      .select('count')
      .eq('id', visitId)
      .single();

    if (selectError) {
      console.error('Error fetching visit count:', selectError);
      return;
    }

    const currentCount = rows.count;

    // Then, increment the count
    const { data: updated, error: updateError } = await supabase
      .from('visits')
      .update({ count: currentCount + 1 })
      .eq('id', visitId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating visit count:', updateError);
      return;
    }

    document.getElementById('visitor-count').textContent = updated.count;
  }

  incrementVisitorCount();