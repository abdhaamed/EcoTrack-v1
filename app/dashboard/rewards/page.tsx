import DashboardTopbar from "@/components/pages/dashboard/DashboardTopbar";
import RewardCard from "@/components/pages/dashboard/RewardCard";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getRewards } from "@/app/actions/reward";
import { Gift, Wallet } from "lucide-react";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Katalog Hadiah - EcoTrack",
};

export default async function RewardsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const supabase = createClient();
  let userPoints = 0;

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE !== "true") {
    const { data: userData } = await supabase
      .from("users")
      .select("total_points")
      .eq("id", user.id)
      .single();
    
    if (userData) {
      userPoints = userData.total_points || 0;
    }
  }

  const { data: rewards, success, error } = await getRewards();

  return (
    <>
      <DashboardTopbar />
      <div className="dashboard-content">
        {/* Header Section */}
        <div className="mb-8 bg-gradient-to-br from-green-600 to-emerald-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Gift className="w-48 h-48" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Katalog Hadiah</h1>
            <p className="text-green-100 max-w-xl mb-6">
              Tukarkan poin hijau yang Anda kumpulkan dari laporan sampah dengan berbagai hadiah menarik dan eksklusif.
            </p>
            
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 px-5 py-3 rounded-xl">
              <Wallet className="w-6 h-6 text-green-100" />
              <div>
                <div className="text-xs text-green-100 font-medium tracking-wide uppercase">Saldo Anda</div>
                <div className="text-2xl font-bold tracking-tight">{userPoints} Poin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Tersedia Saat Ini</h2>
        </div>

        {!success ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
            {error || "Gagal memuat katalog hadiah."}
          </div>
        ) : rewards && rewards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rewards.map((reward: any) => (
              <RewardCard 
                key={reward.id} 
                reward={reward} 
                userId={user.id} 
                userPoints={userPoints} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Katalog Kosong</h3>
            <p className="text-gray-500">Belum ada hadiah yang tersedia saat ini. Cek lagi nanti!</p>
          </div>
        )}
      </div>
    </>
  );
}
