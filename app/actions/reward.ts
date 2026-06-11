"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Dummy data for initial seeding
const DUMMY_REWARDS = [
  {
    name: "Voucher Kopi Janji Jiwa 50K",
    description: "Nikmati kopi favoritmu. E-voucher akan dikirim ke email.",
    image_url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=600&auto=format&fit=crop",
    points_required: 500,
    stock: 20,
    is_active: true
  },
  {
    name: "Tumbler Stainless Steel Eco",
    description: "Kurangi penggunaan botol plastik dengan tumbler eksklusif.",
    image_url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
    points_required: 1500,
    stock: 5,
    is_active: true
  },
  {
    name: "Diskon Belanja Sayur 20%",
    description: "Voucher diskon untuk pembelian sayur organik di mitra kami.",
    image_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop",
    points_required: 300,
    stock: 50,
    is_active: true
  },
  {
    name: "Tas Belanja Kain (Tote Bag)",
    description: "Tote bag kanvas kuat dan tahan lama untuk belanja harian.",
    image_url: "https://images.unsplash.com/photo-1597484661643-2f5fef640df1?q=80&w=600&auto=format&fit=crop",
    points_required: 800,
    stock: 0, // Out of stock example
    is_active: true
  }
];

export async function getRewards() {
  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === "true") {
    console.warn("⚠️ Supabase is disabled - returning dummy rewards");
    return { success: true, data: DUMMY_REWARDS };
  }

  const supabase = createClient();

  // Cek apakah tabel rewards kosong, jika ya, isi dengan dummy
  const { count } = await supabase.from("rewards").select("id", { count: "exact", head: true });
  
  if (count === 0) {
    await supabase.from("rewards").insert(DUMMY_REWARDS);
  }

  const { data, error } = await supabase
    .from("rewards")
    .select("*")
    .eq("is_active", true)
    .order("points_required", { ascending: true });

  if (error) {
    console.error("Error fetching rewards:", error);
    return { success: false, error: "Gagal memuat katalog hadiah" };
  }

  return { success: true, data };
}

export async function redeemReward(rewardId: string, userId: string) {
  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === "true") {
    console.warn("⚠️ Supabase is disabled - redemption bypassed");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/rewards");
    return { success: true };
  }

  const supabase = createClient();

  // 1. Ambil data hadiah dan user
  const { data: reward, error: rewardError } = await supabase
    .from("rewards")
    .select("*")
    .eq("id", rewardId)
    .single();

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (rewardError || userError || !reward || !user) {
    return { success: false, error: "Data tidak valid." };
  }

  // 2. Validasi stok dan poin
  if (reward.stock <= 0) {
    return { success: false, error: "Maaf, stok hadiah ini telah habis." };
  }

  if (user.total_points < reward.points_required) {
    return { success: false, error: "Poin Anda tidak mencukupi." };
  }

  // 3. Eksekusi penukaran (Simulasi transaksi)
  const newPoints = user.total_points - reward.points_required;
  const newStock = reward.stock - 1;

  // Update poin user
  const { error: updatePointError } = await supabase
    .from("users")
    .update({ total_points: newPoints })
    .eq("id", userId);

  // Update stok hadiah
  const { error: updateStockError } = await supabase
    .from("rewards")
    .update({ stock: newStock })
    .eq("id", rewardId);

  if (updatePointError || updateStockError) {
    return { success: false, error: "Gagal memproses penukaran." };
  }

  // 4. Catat riwayat penukaran dan transaksi poin
  await supabase.from("reward_redemptions").insert({
    user_id: userId,
    reward_id: rewardId,
    points_spent: reward.points_required,
    status: "PROCESSING",
    delivery_address: "Email/Akun User" // Default for now
  });

  await supabase.from("point_transactions").insert({
    user_id: userId,
    transaction_type: "DEBIT",
    points: reward.points_required,
    description: `Penukaran hadiah: ${reward.name}`
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/rewards");
  
  return { success: true };
}
