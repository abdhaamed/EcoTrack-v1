"use client";

export default function ImpactCard() {
  return (
    <div className="impact-card animate-fade-in-up animate-delay-1" id="impact-card">
      <h3>Dampak Anda</h3>
      <div className="impact-stats-row">
        {/* Reports completed */}
        <div className="impact-stat">
          <div className="impact-stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div>
            <div className="impact-stat-value">24</div>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div className="impact-stat-value">1.2k</div>
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
