/* eslint-disable @next/next/no-img-element */

import ArticleCard from "./ArticleCard";

const articles = [
  {
    id: 1,
    image: "/images/dashboard/article-compost.png",
    category: "PANDUAN",
    title: "Seni Kompos: Mengubah Sisa Dapur Menjadi Emas Hitam",
    description:
      "Belajar tentang inisiatif yang dipimpin komunitas untuk mengelola limbah organik dan menciptakan kompos berkualitas.",
    readTime: "5 min",
  },
  {
    id: 2,
    image: "/images/dashboard/article-plastic.png",
    category: "DATA",
    title: "Siklus Plastik: Ke Mana Perginya Botol Bekas Anda?",
    description:
      "Pahami bagaimana limbah plastik dikelola dan dampaknya terhadap lingkungan kita.",
    readTime: "8 min",
  },
  {
    id: 3,
    image: "/images/dashboard/hero-forest.png",
    category: "INSPIRASI",
    title: "Hutan Kota: Paru-paru yang Perlu Kita Rawat Bersama",
    description:
      "Temukan bagaimana generasi berikutnya dari pemimpin lingkungan membentuk masa depan kita.",
    readTime: "12 min",
  },
  {
    id: 4,
    image: "/images/dashboard/article-urban.png",
    category: "ENERGI BERSIH",
    title: "Energi Terbarukan untuk Desa Pesisir",
    description:
      "Bagaimana energi terbarukan memberdayakan komunitas di luar jaringan listrik utama.",
    readTime: "10 min",
  },
];

export default function ArticleGrid() {
  return (
    <div className="article-grid">
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
  );
}
