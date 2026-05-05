import DashboardTopbar from "@/components/pages/dashboard/DashboardTopbar";
import HeroBanner from "@/components/pages/dashboard/HeroBanner";
import ImpactCard from "@/components/pages/dashboard/ImpactCard";
import ActivityCard from "@/components/pages/dashboard/ActivityCard";
import WasteMapCard from "@/components/pages/dashboard/WasteMapCard";
import ArticlesSection from "@/components/pages/dashboard/ArticlesSection";

export default function DashboardPage() {
  return (
    <>
      <DashboardTopbar />
      <div className="dashboard-content">
        <HeroBanner />

        {/* Stats + Map grid */}
        <div className="stats-map-grid">
          {/* Left column: Impact + Activity */}
          <div>
            <ImpactCard />
            <ActivityCard />
          </div>

          {/* Right column: Map */}
          <WasteMapCard />
        </div>

        {/* Articles */}
        <ArticlesSection />
      </div>
    </>
  );
}
