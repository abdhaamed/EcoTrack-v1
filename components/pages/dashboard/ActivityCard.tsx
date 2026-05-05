"use client";

const activities = [
  {
    id: 1,
    title: "Laporan #682 Menunggu",
    description: "Area Taman Kota, Jakarta Selatan",
    badge: "2 JAM MENUNGGU",
    status: "processing" as const,
  },
  {
    id: 2,
    title: "Laporan #679 Selesai",
    description: "TPA Bantarpe Sampah Organik",
    badge: "KEMARIN",
    status: "completed" as const,
  },
];

export default function ActivityCard() {
  return (
    <div className="activity-card animate-fade-in-up animate-delay-2" id="activity-card">
      <div className="activity-card-header">
        <h3>
          Aktivitas
          <br />
          Terkini
        </h3>
        <a href="/dashboard/reports">Lihat Semua</a>
      </div>

      <div className="activity-list">
        {activities.map((act) => (
          <div className="activity-item" key={act.id}>
            <div className={`activity-icon ${act.status}`}>
              {act.status === "processing" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              )}
            </div>
            <div className="activity-info">
              <div className="activity-title">{act.title}</div>
              <div className="activity-desc">{act.description}</div>
              <span className={`activity-badge ${act.status}`}>{act.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
