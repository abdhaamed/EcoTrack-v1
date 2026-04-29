"use client";

import { useState } from "react";

export function CtaSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="cta" className="cta-section">
      <div className="cta-inner">
        <h2>Bergabung Sekarang</h2>
        <p>
          Jadilah bagian dari gerakan pengelolaan sampah yang lebih baik. Daftar
          gratis dan mulai kumpulkan poinmu hari ini.
        </p>

        <form className="cta-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Masukkan nama lengkapmu"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Alamat Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="nama@email.com"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            disabled={submitted}
            style={submitted ? { background: "#2d5a27" } : undefined}
          >
            {submitted
              ? "✅ Berhasil Daftar! Selamat Datang 🎉"
              : "Daftar Gratis — Mulai Sekarang"}
          </button>
          <p className="cta-note">
            Gratis selamanya · Tidak perlu kartu kredit · Privasi terjaga
          </p>
        </form>
      </div>
    </section>
  );
}
