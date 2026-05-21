import { createBrowserClient } from '@supabase/ssr'

// Mock client for when Supabase is disabled
const createMockClient = () => ({
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    insert: async () => ({ data: null, error: { message: 'Supabase is disabled' } }),
    select: () => ({ single: async () => ({ data: null, error: { message: 'Supabase is disabled' } }) }),
  }),
})

export const createClient = () => {
  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === 'true') {
    console.warn('⚠️ Supabase is disabled (NEXT_PUBLIC_DISABLE_SUPABASE=true)')
    return createMockClient()
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export const supabase = createClient()
