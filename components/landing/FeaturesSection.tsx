export function FeaturesSection() {
  return (
    <section id="features" className="features">
      <div className="section-header">
        <span className="section-tag">Fitur Unggulan</span>
        <h2>
          Semua yang Kamu
          <br />
          Butuhkan, Dalam Satu Platform
        </h2>
        <p>
          Setiap fitur dirancang untuk membuat pengelolaan sampah lebih mudah,
          menyenangkan, dan bermakna.
        </p>
      </div>

      <div className="features-bento">
        {/* FEATURED: big card */}
        <article className="feature-card featured">
          <div>
            <span className="feat-icon">⭐</span>
            <h3>Sistem Poin &amp; Reward</h3>
            <p>
              Kumpulkan poin dari setiap kontribusi — upload foto, laporan
              lokasi, atau pemilahan sampah. Tukarkan dengan hadiah nyata dari
              mitra kami.
            </p>
          </div>
          <div className="feat-visual">🏆</div>
        </article>

        <article className="feature-card">
          <span className="feat-icon">📸</span>
          <h3>Upload Foto Bukti</h3>
          <p>
            Dokumentasikan sampah yang kamu kumpulkan sebagai bukti kontribusi
            nyata yang terverifikasi sistem.
          </p>
        </article>

        <article className="feature-card accent-card">
          <span className="feat-icon">🎁</span>
          <h3>Redeem Reward</h3>
          <p>
            Tukar poinmu dengan hadiah menarik, voucher, atau donasi ke program
            lingkungan.
          </p>
        </article>

        <article className="feature-card">
          <span className="feat-icon">📍</span>
          <h3>Lapor Titik Sampah</h3>
          <p>
            Laporkan lokasi penumpukan sampah di sekitarmu melalui fitur
            pelaporan berbasis GPS secara real-time.
          </p>
        </article>

        <article className="feature-card">
          <span className="feat-icon">🗺️</span>
          <h3>Peta Pembuangan</h3>
          <p>
            Temukan titik pembuangan dan fasilitas daur ulang terdekat dengan
            peta interaktif yang selalu diperbarui.
          </p>
        </article>

        <article className="feature-card">
          <span className="feat-icon">📚</span>
          <h3>Edukasi Sampah</h3>
          <p>
            Akses konten edukasi tentang jenis sampah, cara pengelolaan yang
            benar, dan dampak positifnya bagi lingkungan.
          </p>
        </article>
      </div>
    </section>
  );
}
