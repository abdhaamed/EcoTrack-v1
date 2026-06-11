"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getPendingReports() {
  const supabase = createClient();
  
  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === "true") {
    // Return mock data
    return {
      success: true,
      data: [
        {
          id: "mock-1",
          user_id: "user-1",
          waste_type: "ORGANIK",
          estimated_weight: 2.5,
          photo_url: "https://via.placeholder.com/300",
          location_address: "Jalan Contoh No 123",
          status: "PENDING",
          created_at: new Date().toISOString()
        }
      ]
    };
  }

  const { data, error } = await supabase
    .from("waste_reports")
    .select("*, users:user_id(name, email)")
    .eq("status", "PENDING")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching pending reports:", error);
    return { success: false, error: "Gagal memuat laporan" };
  }

  return { success: true, data };
}

export async function validateWasteReport(
  reportId: string,
  userId: string,
  status: "APPROVED" | "REJECTED",
  pointsToAward: number = 50,
  adminNote: string = ""
) {
  const supabase = createClient();

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === "true") {
    console.warn("⚠️ Supabase disabled - mock validate");
    revalidatePath("/dashboard/admin");
    return { success: true };
  }

  // 1. Update Report Status
  const { error: updateError } = await supabase
    .from("waste_reports")
    .update({
      status: status,
      points_awarded: status === "APPROVED" ? pointsToAward : 0,
      review_note: adminNote,
      updated_at: new Date().toISOString()
    })
    .eq("id", reportId);

  if (updateError) {
    console.error("Error updating report:", updateError);
    return { success: false, error: "Gagal mengupdate laporan" };
  }

  // 2. If Approved, Add Points and Record Transaction
  if (status === "APPROVED") {
    // Record Transaction
    const { error: txError } = await supabase
      .from("point_transactions")
      .insert({
        user_id: userId,
        report_id: reportId,
        transaction_type: "CREDIT",
        points: pointsToAward,
        description: `Poin dari validasi laporan sampah (${pointsToAward} poin)`
      });

    if (txError) {
      console.error("Error inserting transaction:", txError);
      // Not returning here to still allow the flow, or we could handle it better if needed
    }

    // Since we can't easily do increment in supabase rest without an RPC, 
    // we fetch current points then update. 
    // (In production, an RPC function is highly recommended to avoid race conditions)
    const { data: userData } = await supabase
      .from("users")
      .select("total_points")
      .eq("id", userId)
      .single();
      
    if (userData) {
      const newPoints = (userData.total_points || 0) + pointsToAward;
      await supabase
        .from("users")
        .update({ total_points: newPoints })
        .eq("id", userId);
    }
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/admin");

  return { success: true };
}
