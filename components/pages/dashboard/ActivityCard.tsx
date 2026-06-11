"use client";

import { Clock, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface ActivityCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reports?: any[];
}

export default function ActivityCard({ reports = [] }: ActivityCardProps) {
  return (
    <div className="activity-card animate-fade-in-up animate-delay-2" id="activity-card">
      <div className="activity-card-header">
        <h3>
          Aktivitas
          <br />
          Terkini
        </h3>
        <Link href="/dashboard/reports">Lihat Semua</Link>
      </div>

      <div className="activity-list">
        {reports.length > 0 ? (
          reports.map((act) => (
            <div className="activity-item" key={act.id}>
              <div className={`activity-icon ${
                act.status === 'APPROVED' ? 'completed' : 
                act.status === 'REJECTED' ? 'rejected text-red-500 bg-red-100' : 'processing'
              }`}>
                {act.status === 'APPROVED' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : act.status === 'REJECTED' ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
              </div>
              <div className="activity-info">
                <div className="activity-title">Laporan #{act.id.substring(0, 6)}</div>
                <div className="activity-desc line-clamp-1">{act.location_address || "Lokasi tidak diketahui"}</div>
                <span className={`activity-badge ${
                  act.status === 'APPROVED' ? 'completed' : 
                  act.status === 'REJECTED' ? 'rejected bg-red-50 text-red-600' : 'processing'
                }`}>
                  {act.status === 'APPROVED' ? 'SELESAI' : act.status === 'REJECTED' ? 'DITOLAK' : 'MENUNGGU'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-sm text-gray-500">
            Belum ada aktivitas.
          </div>
        )}
      </div>
    </div>
  );
}
