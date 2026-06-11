/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { FilePlus, FileText } from "lucide-react";

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
        <div className="hero-actions">
          <Link href="/dashboard/pickup" className="btn-primary">
            <FileText className="w-5 h-5" />
            Pesan Penjemputan
          </Link>
        </div>
      </div>
    </section>
  );
}
