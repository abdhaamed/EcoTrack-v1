"use client";

export default function WasteMapCard() {
  return (
    <div className="map-card animate-fade-in-up animate-delay-2" id="waste-map-card">
      {/* Header */}
      <div className="map-card-header">
        <div>
          <h3>Peta Sampah</h3>
          <p>Monitoring real-time titik penumpukan sampah</p>
        </div>
        <div className="map-card-actions">
          <button className="map-filter-btn" id="btn-map-filter">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter
          </button>
          <button className="map-filter-btn" id="btn-map-focus">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            Fokus
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="map-container">
        <div className="map-placeholder">
          {/* Simulated road network */}
          <div className="map-road horizontal main" style={{ top: "40%" }} />
          <div className="map-road horizontal" style={{ top: "25%" }} />
          <div className="map-road horizontal" style={{ top: "60%" }} />
          <div className="map-road horizontal" style={{ top: "78%" }} />
          <div className="map-road vertical main" style={{ left: "35%" }} />
          <div className="map-road vertical" style={{ left: "55%" }} />
          <div className="map-road vertical" style={{ left: "75%" }} />
          <div className="map-road vertical" style={{ left: "20%" }} />

          {/* Map area blocks */}
          <div className="map-block green" style={{ top: "8%", left: "5%", width: "80px", height: "50px" }} />
          <div className="map-block light" style={{ top: "45%", left: "40%", width: "60px", height: "40px" }} />
          <div className="map-block building" style={{ top: "12%", left: "60%", width: "70px", height: "35px" }} />
          <div className="map-block green" style={{ top: "65%", left: "10%", width: "90px", height: "45px" }} />
          <div className="map-block building" style={{ top: "50%", left: "70%", width: "55px", height: "50px" }} />
          <div className="map-block light" style={{ top: "80%", left: "45%", width: "65px", height: "30px" }} />

          {/* Alert marker */}
          <div className="map-pulse alert" style={{ top: "32%", left: "30%" }} />
          <div className="map-marker alert" style={{ top: "32%", left: "30%" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          {/* Eco marker */}
          <div className="map-pulse eco" style={{ top: "65%", left: "68%" }} />
          <div className="map-marker eco" style={{ top: "65%", left: "68%" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          {/* Footer */}
          <div className="map-footer">
            <div className="map-avatars">
              <div className="map-avatar-stack">
                <div className="map-avatar">A</div>
                <div className="map-avatar">B</div>
                <div className="map-avatar">R</div>
              </div>
              <span className="map-footer-text">
                14 Eco-Guardians sedang aktif di area ini
              </span>
            </div>
            <button className="map-report-btn" id="btn-report-map">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              Ikut Melapor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
