import { getArticles } from "@/app/actions/information";
import Link from "next/link";
import { BookOpen, ArrowLeft, Leaf } from "lucide-react";

export const metadata = {
  title: "Pusat Edukasi - EcoTrack",
};

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    ORGANIK: "bg-green-50 text-green-700 border-green-200",
    ANORGANIK: "bg-blue-50 text-blue-700 border-blue-200",
    B3: "bg-red-50 text-red-700 border-red-200",
    DAUR_ULANG: "bg-purple-50 text-purple-700 border-purple-200",
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${colors[category] || "bg-gray-50 text-gray-700"}`}>
      {category}
    </span>
  );
}

export default async function ArticlesPage() {
  const { data: articles, success, error } = await getArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-700 text-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Link href="/dashboard" className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Dasbor
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <BookOpen className="w-8 h-8" /> Pusat Edukasi Lingkungan
          </h1>
          <p className="text-green-100 max-w-2xl text-lg">Pelajari cara mengelola sampah dengan benar, mendaur ulang, dan berkontribusi langsung pada kelestarian bumi.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {!success ? (
          <div className="bg-red-50 p-4 rounded-xl text-red-600">{error || "Terjadi kesalahan memuat artikel."}</div>
        ) : articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => (
              <article key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
                <div className="h-48 relative overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={article.thumbnail_url} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4">
                    <CategoryBadge category={article.category} />
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h2>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">{article.content}</p>
                  <button className="text-green-600 font-semibold text-sm hover:text-green-700 flex items-center mt-auto">
                    Baca Selengkapnya <span className="ml-1">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Leaf className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Belum Ada Artikel</h3>
            <p className="text-gray-500">Materi edukasi akan segera hadir. Pantau terus!</p>
          </div>
        )}
      </div>
    </div>
  );
}
