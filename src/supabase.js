import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zkqtivqzxzlpiouexgki.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprcXRpdnF6eHpscGlvdWV4Z2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4OTM3NDgsImV4cCI6MjA3NTQ2OTc0OH0.ieUXopGRz02GPOpIh0QBulADD7WMhLn61NhQNoux7ds'

export const supabase = createClient(supabaseUrl, supabaseKey)
