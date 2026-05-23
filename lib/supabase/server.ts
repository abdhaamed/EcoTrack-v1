import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Mock client for when Supabase is disabled
const createMockServerClient = () => ({
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: { id: 'mock-user-1' } }, error: null }),
    signOut: async () => ({ error: null }),
    signInWithPassword: async () => ({ error: { message: 'Supabase is disabled' } }),
    signUp: async () => ({ error: { message: 'Supabase is disabled' } }),
  },
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      eq: () => ({
        single: async () => ({ data: null, error: { message: 'Mock: not implemented' } }),
        order: () => ({
          limit: async () => ({ data: [], error: null }),
          single: async () => ({ data: null, error: { message: 'Mock: not implemented' } }),
        }),
      }),
      order: () => ({
        limit: async () => ({ data: [], error: null }),
      }),
    }),
    insert: (data: any) => ({
      select: () => ({
        single: async () => ({ data: { ...data, id: 'mock-' + Date.now() }, error: null }),
      }),
    }),
    update: (data: any) => ({
      eq: () => ({
        single: async () => ({ data: { ...data }, error: null }),
      }),
    }),
  }),
})

export const createClient = () => {
  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === 'true') {
    console.warn('⚠️ Supabase is disabled (NEXT_PUBLIC_DISABLE_SUPABASE=true)')
    return createMockServerClient()
  }

  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
