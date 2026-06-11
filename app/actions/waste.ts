'use server';

import { createClient } from '@/lib/supabase/server';
import { WasteReportSchema } from '@/lib/validations/waste';
import { WasteReportResult } from '@/types/waste';
import { revalidatePath } from 'next/cache';

/**
 * Submits a new waste report to Supabase.
 */
export async function submitWasteReport(payload: unknown): Promise<WasteReportResult> {
  const supabase = createClient();

  // 1. Validate payload fields
  const validation = WasteReportSchema.safeParse(payload);

  if (!validation.success) {
    const errorMessage = validation.error.issues.map((issue: { message: string }) => issue.message).join(', ');
    return { success: false, error: errorMessage };
  }

  const data = validation.data;

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === "true") {
    console.warn("⚠️ Supabase is disabled - waste report bypassed");
    revalidatePath('/dashboard');
    return { success: true, data: { id: "dummy-123", status: "PENDING", ...data } };
  }

  // 2. Insert into 'waste_reports' table using Supabase client.
  // We map camelCase (Zod/Frontend) to snake_case (Database)
  const { data: insertedData, error } = await supabase
    .from('waste_reports')
    .insert({
      user_id: data.userId,
      waste_type: data.wasteType,
      estimated_weight: data.estimatedWeight,
      photo_url: data.photoUrl,
      location_address: data.locationAddress,
      latitude: data.latitude,
      longitude: data.longitude,
      status: 'PENDING',
    })
    .select()
    .single();

  if (error) {
    console.error('Supabase Error:', error);
    return { success: false, error: 'Gagal menyimpan laporan ke database' };
  }

  // 4. Revalidate path to update UI
  revalidatePath('/dashboard');

  return { success: true, data: insertedData };
}
