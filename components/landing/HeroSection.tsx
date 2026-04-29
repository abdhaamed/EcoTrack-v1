"use client";

export function HeroSection() {
  return (
    <>
      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-text">
          <div className="hero-tag anim anim-1">
            <span></span> Platform Pengelolaan Sampah Digital
          </div>
          <h1 className="anim anim-2">
            Ubah Sampah
            <br />
            <em>Jadi Impact.</em>
          </h1>
          <p className="hero-sub anim anim-3">
            Temukan fasilitas sampah terdekat, pelajari cara pengelolaan yang
            benar, dan dapatkan reward untuk setiap kontribusimu bagi
            lingkungan.
          </p>
          <div className="hero-actions anim anim-4">
            <a href="#cta" className="btn-primary">
              Mulai Sekarang
            </a>
            <a href="#how-it-works" className="btn-outline">
              Pelajari Cara Kerja
            </a>
          </div>
        </div>

        <div className="hero-visual anim anim-5">
          <div className="hero-bg-card"></div>

          {/* decorative SVG leaf */}
          <svg
            className="leaf-art"
            viewBox="0 0 340 420"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="340" height="420" rx="20" fill="#1b4d1a" />
            <ellipse
              cx="170"
              cy="210"
              rx="130"
              ry="160"
              fill="none"
              stroke="rgba(188,240,174,.25)"
              strokeWidth="1.5"
            />
            <ellipse
              cx="170"
              cy="210"
              rx="90"
              ry="115"
              fill="none"
              stroke="rgba(188,240,174,.15)"
              strokeWidth="1"
            />
            <line
              x1="170"
              y1="60"
              x2="170"
              y2="360"
              stroke="rgba(188,240,174,.2)"
              strokeWidth="1.5"
            />
            <line
              x1="170"
              y1="160"
              x2="80"
              y2="120"
              stroke="rgba(188,240,174,.15)"
              strokeWidth="1"
            />
            <line
              x1="170"
              y1="190"
              x2="260"
              y2="150"
              stroke="rgba(188,240,174,.15)"
              strokeWidth="1"
            />
            <line
              x1="170"
              y1="220"
              x2="75"
              y2="190"
              stroke="rgba(188,240,174,.12)"
              strokeWidth="1"
            />
            <line
              x1="170"
              y1="250"
              x2="265"
              y2="220"
              stroke="rgba(188,240,174,.12)"
              strokeWidth="1"
            />
            <line
              x1="170"
              y1="280"
              x2="95"
              y2="260"
              stroke="rgba(188,240,174,.1)"
              strokeWidth="1"
            />
            <text
              x="170"
              y="400"
              textAnchor="middle"
              fill="rgba(188,240,174,.3)"
              fontFamily="serif"
              fontSize="11"
              letterSpacing="2"
            >
              ECO · TRACK
            </text>
          </svg>

          {/* polaroid photo card */}
          <div className="photo-card">
            <svg
              viewBox="0 0 150 100"
              xmlns="http://www.w3.org/2000/svg"
              style={{ borderRadius: "6px" }}
            >
              <rect width="150" height="100" fill="#2d5a27" />
              <path
                d="M0 60 Q40 35 80 55 T150 45 L150 100 L0 100Z"
                fill="rgba(188,240,174,.2)"
              />
              <circle cx="115" cy="28" r="18" fill="rgba(188,240,174,.15)" />
              <circle cx="115" cy="28" r="10" fill="rgba(188,240,174,.25)" />
              <path
                d="M10 70 L35 45 L55 60 L75 40 L95 55 L120 35 L140 50"
                stroke="rgba(188,240,174,.5)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <p className="photo-card-label">📸 Upload Bukti</p>
          </div>

          {/* stat pill */}
          <div className="stat-pill">
            <strong>3.4k+</strong>
            Pengguna Aktif
          </div>
        </div>
      </section>

      {/* IMPACT BANNER */}
      <div className="impact-banner">
        <div className="impact-inner">
          <span className="impact-label">Dampak Nyata Kami</span>
          <div className="impact-stats">
            <div className="stat-item">
              <span className="stat-num">1.2k</span>
              <p className="stat-desc">Kg Sampah Terdokumentasi</p>
            </div>
            <div className="stat-item">
              <span className="stat-num">3.4k</span>
              <p className="stat-desc">Pengguna Bergabung</p>
            </div>
            <div className="stat-item">
              <span className="stat-num">500+</span>
              <p className="stat-desc">Titik Sampah Terlaporkan</p>
            </div>
            <div className="stat-item">
              <span className="stat-num">80+</span>
              <p className="stat-desc">Mitra Reward</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
