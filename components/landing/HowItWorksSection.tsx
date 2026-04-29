export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="how-section">
      <div className="how-inner">
        <span className="section-tag">Cara Kerja</span>
        <h2>
          3 Langkah Mudah
          <br />
          Menuju Dampak Nyata
        </h2>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <div className="step-icon">📸</div>
            <h3>Upload Foto Sampah</h3>
            <p>
              Foto sampah yang kamu kumpulkan atau pilah. Sistem kami akan
              memverifikasi dan mencatat kontribusimu secara otomatis.
            </p>
          </div>
          <div className="step-card">
            <span className="step-number">02</span>
            <div className="step-icon">⭐</div>
            <h3>Kumpulkan Poin</h3>
            <p>
              Setiap aktivitas — upload foto, lapor titik sampah, atau
              selesaikan tantangan — menghasilkan poin yang terakumulasi di
              akunmu.
            </p>
          </div>
          <div className="step-card">
            <span className="step-number">03</span>
            <div className="step-icon">🎁</div>
            <h3>Tukarkan Reward</h3>
            <p>
              Redeem poinmu dengan berbagai hadiah menarik dari mitra EcoTrack:
              voucher belanja, pulsa, hingga donasi lingkungan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
