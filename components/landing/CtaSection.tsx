"use client";

import Link from "next/link";

export function CtaSection() {
  return (
    <section id="cta" className="cta-section">
      <div className="cta-inner flex flex-col items-center text-center">
        <h2>Bergabung Sekarang</h2>
        <p className="mb-8">
          Jadilah bagian dari gerakan pengelolaan sampah yang lebih baik. Daftar
          gratis dan mulai kumpulkan poinmu hari ini.
        </p>

        <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">
          Daftar Gratis — Mulai Sekarang
        </Link>
        <p className="cta-note mt-4">
          Gratis selamanya · Tidak perlu kartu kredit · Privasi terjaga
        </p>
      </div>
    </section>
  );
}
