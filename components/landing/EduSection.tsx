import Link from "next/link";

export function EduSection() {
  return (
    <section id="edukasi" className="edu-section">
      <div className="section-header">
        <span className="section-tag">Edukasi &amp; Dampak</span>
        <h2>
          Kelola Sampah dengan
          <br />
          Pengetahuan yang Tepat
        </h2>
        <p>
          Tidak hanya reward — EcoTrack hadir sebagai media edukasi
          berkelanjutan untuk membangun kebiasaan ramah lingkungan.
        </p>
      </div>

      <div className="edu-grid">
        <div className="edu-primary">
          <h3>Aktivitas &amp; Progres Lingkunganmu</h3>
          <p>
            Pantau perkembangan kontribusimu secara real-time. Lihat berapa
            kilogram sampah yang sudah kamu selamatkan, berapa titik yang kamu
            laporkan, dan dampak nyata yang telah kamu ciptakan.
          </p>
          <a href="#cta" className="btn-light">
            Lihat Dashboard →
          </a>

          {/* mini progress bar */}
          <div style={{ marginTop: "1.8rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: ".75rem",
                marginBottom: ".35rem",
                color: "rgba(255,255,255,.6)",
              }}
            >
              <span>Menuju Target Impact</span>
              <span>72%</span>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.15)",
                borderRadius: "999px",
                height: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "var(--accent-green)",
                  width: "72%",
                  height: "100%",
                  borderRadius: "999px",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="edu-secondary">
          <Link href="/edukasi/pilah-sampah" className="edu-card-link">
            <div className="edu-card edu-card-interactive">
              <div className="edu-card-icon">♻️</div>
              <div>
                <h4>Panduan Pilah Sampah</h4>
                <p>
                  Pelajari cara memilah sampah organik, anorganik, B3, dan
                  limbah elektronik dengan panduan visual yang mudah dipahami.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/edukasi/dampak-lingkungan" className="edu-card-link">
            <div className="edu-card edu-card-interactive">
              <div className="edu-card-icon">🌍</div>
              <div>
                <h4>Dampak untuk Lingkungan</h4>
                <p>
                  Setiap tindakanmu berkontribusi pada pengurangan emisi karbon.
                  Lihat dampak kolektif komunitas EcoTrack.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/edukasi/pelaporan-lokasi" className="edu-card-link">
            <div className="edu-card edu-card-interactive">
              <div className="edu-card-icon">🏘️</div>
              <div>
                <h4>Pelaporan Berbasis Lokasi</h4>
                <p>
                  Laporkan titik penumpukan sampah di sekitarmu. Data ini
                  digunakan pemerintah dan mitra untuk tindak lanjut nyata.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/edukasi/komunitas" className="edu-card-link">
            <div className="edu-card edu-card-interactive">
              <div className="edu-card-icon">🤝</div>
              <div>
                <h4>Komunitas &amp; Tantangan</h4>
                <p>
                  Bergabung dalam challenge komunitas, bersaing di leaderboard,
                  dan jadilah agen perubahan lingkungan bersama-sama.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
