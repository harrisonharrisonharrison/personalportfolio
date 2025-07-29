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

async function logVisit() {
  const { data, error } = await supabase
    .from('visit_logs')
    .insert([{ }]); // timestamp will default to now()

  if (error) {
    console.error('Error logging visit:', error);
    return;
  }
}

logVisit();

async function getMonthlyVisitors() {
  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { count, error } = await supabase
    .from('visit_logs')
    .select('*', { count: 'exact', head: true })
    .gte('timestamp', firstOfMonth); // only include this month's visits

  if (error) {
    console.error('Error counting visits this month:', error);
    return;
  }

  document.getElementById('visitor-month').textContent = count;
}

getMonthlyVisitors();