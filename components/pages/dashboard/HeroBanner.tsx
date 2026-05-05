/* eslint-disable @next/next/no-img-element */
"use client";

export default function HeroBanner() {
  return (
    <section className="hero-banner animate-fade-in-up" id="hero-banner">
      <img
        src="/images/dashboard/hero-forest.png"
        alt="Forest canopy"
        className="hero-banner-bg"
      />
      <div className="hero-banner-overlay" />
      <div className="hero-banner-content">
        <h2>
          Lapor Sampah,
          <br />
          Selamatkan Ekosistem.
        </h2>
        <p>
          Setiap laporan adalah data berharga untuk masa depan bumi yang lebih hijau.
        </p>
        <button className="hero-cta-btn" id="btn-new-report">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          Buat Laporan Baru
        </button>
      </div>
    </section>
  );
}
