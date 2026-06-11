"use client";

import { Filter, Focus, Send } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const DashboardMap = dynamic(() => import("@/components/pages/dashboard/DashboardMap"), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 text-gray-400">Memuat Peta...</div>
});

interface WasteMapCardProps {
  reports?: Record<string, unknown>[];
}

export default function WasteMapCard({ reports = [] }: WasteMapCardProps) {
  return (
    <div className="map-card animate-fade-in-up animate-delay-2 flex flex-col" id="waste-map-card">
      {/* Header */}
      <div className="map-card-header">
        <div>
          <h3>Peta Sampah</h3>
          <p>Monitoring real-time titik penumpukan sampah</p>
        </div>
        <div className="map-card-actions">
          <button className="map-filter-btn" id="btn-map-filter">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="map-filter-btn" id="btn-map-focus">
            <Focus className="w-4 h-4" />
            Fokus
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-grow relative h-[400px]">
        <DashboardMap reports={reports} />
        
        {/* Footer Overlay (Ikut Melapor) */}
        <div className="absolute bottom-4 right-4 z-[1000]">
          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 pl-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-xs font-bold text-green-700">A</div>
                <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-700">B</div>
                <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-xs font-bold text-orange-700">R</div>
              </div>
              <span className="text-xs text-gray-600 pr-2">
                {reports.length} Laporan terekam
              </span>
            </div>
            <Link href="/dashboard/pickup" className="bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-md" id="btn-report-map">
              <Send className="w-4 h-4" />
              Pesan Penjemputan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
