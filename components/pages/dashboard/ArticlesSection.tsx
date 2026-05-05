/* eslint-disable @next/next/no-img-element */
"use client";

const articles = [
  {
    id: 1,
    image: "/images/dashboard/article-compost.png",
    category: "Panduan",
    readTime: "5 Menit",
    title: "Seni Kompos: Mengubah Sisa Dapur Menjadi Emas Hitam",
  },
  {
    id: 2,
    image: "/images/dashboard/article-plastic.png",
    category: "Data",
    readTime: "8 Menit",
    title: "Siklus Plastik: Ke Mana Perginya Botol Bekas Anda?",
  },
  {
    id: 3,
    image: "/images/dashboard/article-urban.png",
    category: "Inspirasi",
    readTime: "12 Menit",
    title: "Hutan Kota: Paru-paru yang Perlu Kita Rawat Bersama",
  },
];

export default function ArticlesSection() {
  return (
    <section className="articles-section animate-fade-in-up animate-delay-3" id="articles-section">
      <div className="articles-section-header">
        <div className="articles-section-label">Living Archive Journal</div>
        <h3 className="articles-section-title">Panduan Pengolahan</h3>
      </div>

      <div className="articles-grid">
        {articles.map((article) => (
          <article className="article-card" key={article.id} id={`article-${article.id}`}>
            <div className="article-card-img">
              <img src={article.image} alt={article.title} />
            </div>
            <div className="article-card-body">
              <div className="article-meta">
                <span className="article-category">{article.category}</span>
                <span className="article-meta-sep" />
                <span className="article-read-time">{article.readTime}</span>
              </div>
              <h4 className="article-card-title">{article.title}</h4>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
