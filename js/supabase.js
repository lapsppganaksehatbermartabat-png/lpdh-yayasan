// Lokasi file: js/supabase.js

const SUPABASE_URL = 'https://qpdbfnwxqbkqoqwfcaqg.supabase.co'; // Ganti dengan Project URL Supabase kamu
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwZGJmbnd4cWJrcW9xd2ZjYXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMDU2MzksImV4cCI6MjEwODg4MTYzOX0.es9VI3nOYYSKlH_4xedXRYpY_v6RYh0adirWsEcMqsQ'; // Ganti dengan Anon Key Supabase kamu

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);