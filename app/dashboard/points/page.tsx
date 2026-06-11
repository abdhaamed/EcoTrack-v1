import DashboardTopbar from "@/components/pages/dashboard/DashboardTopbar";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ArrowDownRight, ArrowUpRight, Clock, Award } from "lucide-react";

export const metadata = {
  title: "Riwayat Poin - EcoTrack",
};

export default async function PointsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const supabase = createClient();
  let userPoints = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let transactions: any[] = [];
  let success = false;
  let errorMsg = "";

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE !== "true") {
    // Ambil total points
    const { data: userData } = await supabase
      .from("users")
      .select("total_points")
      .eq("id", user.id)
      .single();
    
    if (userData) {
      userPoints = userData.total_points || 0;
    }

    // Ambil riwayat transaksi
    const { data: txData, error } = await supabase
      .from("point_transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      errorMsg = "Gagal memuat riwayat poin.";
    } else {
      success = true;
      transactions = txData || [];
    }
  } else {
    success = true;
  }

  return (
    <>
      <DashboardTopbar />
      <div className="dashboard-content max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Riwayat Poin</h1>
          <p className="text-gray-600">Pantau perolehan dan pengeluaran Poin Hijau Anda.</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-8 text-white shadow-md mb-8 flex items-center justify-between">
          <div>
            <div className="text-green-100 text-sm font-medium uppercase tracking-wider mb-1">Total Saldo Saat Ini</div>
            <div className="text-4xl font-bold flex items-center gap-2">
              <Award className="w-8 h-8" />
              {userPoints} Poin
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-semibold text-gray-800">Riwayat Transaksi</h2>
          </div>
          
          <div className="p-0">
            {!success ? (
              <div className="p-6 text-red-500 text-center">{errorMsg}</div>
            ) : transactions.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full flex-shrink-0 ${tx.transaction_type === 'CREDIT' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {tx.transaction_type === 'CREDIT' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">{tx.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(tx.created_at).toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>
                    <div className={`text-lg font-bold whitespace-nowrap ${tx.transaction_type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.transaction_type === 'CREDIT' ? '+' : '-'}{tx.points}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">
                Belum ada riwayat transaksi poin.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
