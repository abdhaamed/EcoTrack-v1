import { createClient } from "@/lib/supabase/server"

/**
 * Gets the current session.
 */
export async function getSession() {
  const supabase = createClient()
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  } catch (error) {
    if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE !== 'true') {
      console.error('Error fetching session:', error)
    }
    return null
  }
}

/**
 * Gets the current user.
 */
export async function getCurrentUser() {
  const supabase = createClient()
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE !== 'true') {
      console.error('Error fetching user:', error)
    }
    return null
  }
}

/**
 * Signs out the current user.
 */
export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
}
