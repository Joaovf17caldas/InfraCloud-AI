// api/signup.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://swaxabrhmfltozecvbke.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3YXhhYnJobWZsdG96ZWN2YmtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5Mjc0MDEsImV4cCI6MjA3NzUwMzQwMX0.oEXh9hgi0nqcBdpXvSNfi47ziz0KS_mk9kZU9mLVNmE'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, plan } = req.body

  if (!name || !email || !plan) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  const { data, error } = await supabase
    .from('signups')
    .insert([{ name, email, plan }])

  if (error) {
    return res.status(500).json({ message: error.message })
  }

  return res.status(200).json({ message: 'Signed up successfully!' })
}

export const config = {
  api: {
    bodyParser: true,
  },
}