'use server';

/**
 * Imports (comment-only as requested):
 * import { createClient } from '@/lib/supabase/server';
 * import { WasteReportPayload, WasteReportResult } from '@/types/waste';
 */

/**
 * Submits a new waste report to Supabase.
 * 
 * Contract:
 * 1. Validate payload fields.
 * 2. Insert into 'waste_reports' table using Supabase client.
 * 3. Return success/error result.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function submitWasteReport(payload: unknown): Promise<{ success: boolean; error?: string }> {
  // Stub implementation
  return { success: false, error: 'not implemented' };
}
