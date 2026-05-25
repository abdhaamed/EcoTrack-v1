import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Leaf, Cloud, Droplets, LineChart } from 'lucide-react';

export const metadata = {
  title: 'Dampak Lingkungan - EcoTrack',
  description: 'Pelajari bagaimana kontribusi kecilmu dalam mengelola sampah dapat memberikan dampak besar pada pelestarian lingkungan dan pengurangan emisi karbon.',
};

export default function DampakLingkunganPage() {
  return (
    <main className="min-h-screen bg-surface py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/#edukasi" className="inline-flex items-center gap-2 text-veridian-leaf hover:text-deep-forest font-medium mb-8 transition-colors">
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </Link>

        <div className="mb-12 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-sapling-green text-deep-forest text-sm font-bold tracking-wider mb-4">
            DAMPAK & DATA
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-deep-forest mb-6 font-display">
            Aksi Kecil, Dampak Masif
          </h1>
          <p className="text-lg text-charcoal opacity-80 leading-relaxed max-w-2xl mx-auto">
            Setiap gram sampah yang kamu pilah dan laporkan melalui EcoTrack memiliki efek domino yang positif bagi keberlangsungan bumi kita.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 border border-bone shadow-sm flex flex-col items-center text-center hover:border-sapling-green transition-colors">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
              <Cloud size={32} />
            </div>
            <h3 className="text-xl font-bold text-deep-forest mb-3">Pengurangan Emisi Karbon</h3>
            <p className="text-charcoal opacity-80 text-sm leading-relaxed">
              Mendaur ulang bahan seperti plastik dan logam membutuhkan energi yang jauh lebih sedikit dibandingkan memproduksinya dari bahan mentah. Ini memangkas emisi gas rumah kaca secara drastis.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 border border-bone shadow-sm flex flex-col items-center text-center hover:border-sapling-green transition-colors">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6">
              <Leaf size={32} />
            </div>
            <h3 className="text-xl font-bold text-deep-forest mb-3">Pelestarian Sumber Daya</h3>
            <p className="text-charcoal opacity-80 text-sm leading-relaxed">
              Kertas daur ulang menyelamatkan ribuan pohon. Plastik daur ulang menghemat minyak bumi. Kita memastikan generasi masa depan tetap memiliki akses ke sumber daya alam.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 border border-bone shadow-sm flex flex-col items-center text-center hover:border-sapling-green transition-colors">
            <div className="w-16 h-16 bg-cyan-50 text-cyan-500 rounded-2xl flex items-center justify-center mb-6">
              <Droplets size={32} />
            </div>
            <h3 className="text-xl font-bold text-deep-forest mb-3">Pencegahan Pencemaran</h3>
            <p className="text-charcoal opacity-80 text-sm leading-relaxed">
              Sampah B3 dan elektronik yang dibuang sembarangan akan meracuni tanah dan air tanah. Pelaporan lokasi membantu mencegah pencemaran merusak ekosistem lokal.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-8 border border-bone shadow-sm flex flex-col items-center text-center hover:border-sapling-green transition-colors">
            <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-6">
              <LineChart size={32} />
            </div>
            <h3 className="text-xl font-bold text-deep-forest mb-3">Sirkular Ekonomi</h3>
            <p className="text-charcoal opacity-80 text-sm leading-relaxed">
              Sampahmu adalah bahan baku bagi industri lain. Bank sampah mengubah limbah menjadi komoditas ekonomi yang memberikan lapangan pekerjaan baru bagi masyarakat.
            </p>
          </div>
        </div>

        {/* Kalkulator Sederhana atau Callout */}
        <div className="bg-bone rounded-2xl p-8 md:p-10 border border-bone mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-deep-forest mb-4">Pantau Dampak Personalmu</h2>
            <p className="text-charcoal opacity-80 mb-6 leading-relaxed">
              Di Dashboard EcoTrack, setiap laporan sampah yang disetujui akan otomatis dikonversi menjadi metrik dampak nyata (seperti kg CO2 yang diselamatkan). Lacak progresmu dan lihat bagaimana kamu membuat perbedaan.
            </p>
            <Link href="/dashboard" className="inline-flex items-center gap-2 bg-deep-forest text-white px-6 py-3 rounded-full font-bold hover:bg-veridian-leaf transition-colors">
              Lihat Dashboard Saya
            </Link>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-48 h-48 bg-sapling-green rounded-full flex items-center justify-center relative shadow-lg">
              <div className="text-center">
                <span className="block text-4xl font-black text-deep-forest">12.5</span>
                <span className="block text-sm font-bold text-deep-forest mt-1">Kg CO2</span>
                <span className="block text-xs text-veridian-leaf">Diselamatkan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
