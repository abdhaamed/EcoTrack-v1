"use client";

import { FileText, Layers } from "lucide-react";

interface ImpactCardProps {
  reportsCount?: number;
  points?: number;
}

export default function ImpactCard({ reportsCount = 0, points = 0 }: ImpactCardProps) {
  return (
    <div className="impact-card animate-fade-in-up animate-delay-1" id="impact-card">
      <h3>Dampak Anda</h3>
      <div className="impact-stats-row">
        {/* Reports completed */}
        <div className="impact-stat">
          <div className="impact-stat-icon">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="impact-stat-value">{reportsCount}</div>
            <div className="impact-stat-label">
              Laporan
              <br />
              Selesai
            </div>
          </div>
        </div>

        <div className="impact-stat-divider" />

        {/* Points */}
        <div className="impact-stat">
          <div className="impact-stat-icon">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="impact-stat-value">{points >= 1000 ? (points / 1000).toFixed(1) + 'k' : points}</div>
            <div className="impact-stat-label">
              Poin
              <br />
              Hijau
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
