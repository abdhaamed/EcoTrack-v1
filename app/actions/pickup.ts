"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const pickupSchema = z.object({
  userId: z.string().uuid(),
  wasteType: z.string().min(1, "Pilih jenis sampah"),
  estimatedWeight: z.number().min(0.1, "Berat minimal 0.1 kg"),
  pickupDate: z.string().min(1, "Pilih tanggal penjemputan"),
  pickupTime: z.string().min(1, "Pilih waktu penjemputan"),
  address: z.string().min(10, "Alamat terlalu pendek"),
  latitude: z.number(),
  longitude: z.number(),
});

export type PickupPayload = z.infer<typeof pickupSchema>;

export async function submitPickupRequest(payload: PickupPayload) {
  try {
    const validation = pickupSchema.safeParse(payload);
    if (!validation.success) {
      const errorMessage = validation.error.issues.map(issue => issue.message).join(', ');
      return { success: false, error: errorMessage };
    }
    const validated = validation.data;
    const supabase = createClient();

    if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === "true") {
      console.warn("⚠️ Supabase is disabled - pickup request bypassed");
      return { success: true };
    }

    // Menyimpan sebagai waste_reports dengan prefix [PICKUP] di alamat untuk membedakan
    // Ini menghemat waktu membuat tabel baru, sambil memastikan fitur berjalan end-to-end
    const fullAddress = `[PICKUP - ${validated.pickupDate} ${validated.pickupTime}] ${validated.address}`;

    const { error } = await supabase.from("waste_reports").insert({
      user_id: validated.userId,
      waste_type: validated.wasteType,
      estimated_weight: validated.estimatedWeight,
      photo_url: "https://example.com/pickup-icon.jpg", // Placeholder
      location_address: fullAddress,
      latitude: validated.latitude,
      longitude: validated.longitude,
      status: "PENDING",
    });

    if (error) throw new Error(error.message);

    return { success: true };
  } catch (error: unknown) {
    console.error("Pickup submission error:", error);
    return { success: false, error: (error as Error).message || "Gagal memesan penjemputan" };
  }
}
