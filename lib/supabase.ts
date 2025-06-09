'use client'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sofqgnolcccdwigtigkc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZnFnbm9sY2NjZHdpZ3RpZ2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNzMyMzgsImV4cCI6MjA2MTg0OTIzOH0.8rSeiRLYHFNVfgcE5NdVfdiAGvzKedTXkdjovLNsqpo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 