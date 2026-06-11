import DashboardTopbar from "@/components/pages/dashboard/DashboardTopbar";
import HeroBanner from "@/components/pages/dashboard/HeroBanner";
import ImpactCard from "@/components/pages/dashboard/ImpactCard";
import ActivityCard from "@/components/pages/dashboard/ActivityCard";
import WasteMapCard from "@/components/pages/dashboard/WasteMapCard";
import ArticlesSection from "@/components/pages/dashboard/ArticlesSection";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Dashboard - EcoTrack",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const supabase = createClient();
  
  let points = 0;
  let reportsCount = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentReports: any[] = [];

  if (user && process.env.NEXT_PUBLIC_DISABLE_SUPABASE !== "true") {
    // Ambil total poin dari tabel users
    const { data: userData } = await supabase
      .from("users")
      .select("total_points")
      .eq("id", user.id)
      .single();
    
    if (userData) {
      points = userData.total_points || 0;
    }

    // Ambil riwayat laporan terbaru
    const { data: reportsData } = await supabase
      .from("waste_reports")
      .select("id, waste_type, status, created_at, latitude, longitude, location_address")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (reportsData) {
      recentReports = reportsData;
      
      // Ambil jumlah total laporan untuk ImpactCard
      const { count } = await supabase
        .from("waste_reports")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("status", "APPROVED");
        
      reportsCount = count || 0;
    }
  }

  return (
    <>
      <DashboardTopbar />
      <div className="dashboard-content">
        <HeroBanner />

        {/* Stats + Map grid */}
        <div className="stats-map-grid">
          {/* Left column: Impact + Activity */}
          <div>
            <ImpactCard points={points} reportsCount={reportsCount} />
            <ActivityCard reports={recentReports.slice(0, 2)} />
          </div>

          {/* Right column: Map */}
          <WasteMapCard reports={recentReports.filter(r => r.latitude && r.longitude)} />
        </div>

        {/* Articles */}
        <ArticlesSection />
      </div>
    </>
  );
}
