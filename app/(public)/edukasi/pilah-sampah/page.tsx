import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';

export const metadata = {
  title: 'Panduan Pilah Sampah - EcoTrack',
  description: 'Pelajari cara memilah sampah organik, anorganik, B3, dan residu dengan benar.',
};

export default function PanduanPilahSampahPage() {
  return (
    <main className="min-h-screen bg-surface py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/#edukasi" className="inline-flex items-center gap-2 text-veridian-leaf hover:text-deep-forest font-medium mb-8 transition-colors">
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </Link>

        <div className="mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-sapling-green text-deep-forest text-sm font-bold tracking-wider mb-4">
            PANDUAN EDUKASI
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-deep-forest mb-6 font-display">
            Panduan Pilah Sampah
          </h1>
          <p className="text-lg text-charcoal opacity-80 leading-relaxed max-w-3xl">
            Memilah sampah adalah langkah pertama yang paling penting dalam daur ulang. Dengan memisahkan sampah sesuai jenisnya, kita dapat mengurangi volume sampah di TPA dan mendaur ulang material berharga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Organik */}
          <div className="bg-white rounded-2xl p-8 border border-bone shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center text-3xl mb-6">
              🥬
            </div>
            <h2 className="text-2xl font-bold text-deep-forest mb-3">Sampah Organik</h2>
            <p className="text-charcoal opacity-80 mb-6 leading-relaxed">
              Sampah yang mudah membusuk dan dapat terurai secara alami. Sangat cocok dijadikan kompos atau eco-enzyme.
            </p>
            <div className="bg-bone rounded-xl p-4">
              <h3 className="font-bold text-veridian-leaf mb-2 flex items-center gap-2">
                <Info size={16} /> Contoh:
              </h3>
              <ul className="list-disc list-inside text-charcoal opacity-80 ml-1 space-y-1 text-sm">
                <li>Sisa makanan, sayur, dan buah</li>
                <li>Daun kering, ranting, rumput</li>
                <li>Kulit telur, ampas teh/kopi</li>
                <li>Tulang ayam/ikan (potong kecil)</li>
              </ul>
            </div>
          </div>

          {/* Anorganik */}
          <div className="bg-white rounded-2xl p-8 border border-bone shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-3xl mb-6">
              🥤
            </div>
            <h2 className="text-2xl font-bold text-deep-forest mb-3">Sampah Anorganik</h2>
            <p className="text-charcoal opacity-80 mb-6 leading-relaxed">
              Sampah yang sulit atau tidak bisa terurai secara alami, namun sebagian besar dapat didaur ulang menjadi produk baru.
            </p>
            <div className="bg-bone rounded-xl p-4">
              <h3 className="font-bold text-veridian-leaf mb-2 flex items-center gap-2">
                <Info size={16} /> Contoh:
              </h3>
              <ul className="list-disc list-inside text-charcoal opacity-80 ml-1 space-y-1 text-sm">
                <li>Botol dan gelas plastik</li>
                <li>Kertas, kardus, karton</li>
                <li>Kaleng minuman, aluminium</li>
                <li>Kaca dan botol beling</li>
              </ul>
            </div>
          </div>

          {/* B3 */}
          <div className="bg-white rounded-2xl p-8 border border-bone shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center text-3xl mb-6">
              ⚠️
            </div>
            <h2 className="text-2xl font-bold text-deep-forest mb-3">Sampah B3</h2>
            <p className="text-charcoal opacity-80 mb-6 leading-relaxed">
              Bahan Berbahaya dan Beracun (B3) yang memerlukan penanganan khusus agar tidak mencemari lingkungan.
            </p>
            <div className="bg-bone rounded-xl p-4">
              <h3 className="font-bold text-veridian-leaf mb-2 flex items-center gap-2">
                <Info size={16} /> Contoh:
              </h3>
              <ul className="list-disc list-inside text-charcoal opacity-80 ml-1 space-y-1 text-sm">
                <li>Baterai bekas dan aki</li>
                <li>Lampu neon/TL</li>
                <li>Kaleng aerosol (obat nyamuk, dll)</li>
                <li>Kemasan produk pembersih kimia</li>
              </ul>
            </div>
          </div>

          {/* Residu / Elektronik */}
          <div className="bg-white rounded-2xl p-8 border border-bone shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl mb-6">
              💻
            </div>
            <h2 className="text-2xl font-bold text-deep-forest mb-3">E-Waste & Residu</h2>
            <p className="text-charcoal opacity-80 mb-6 leading-relaxed">
              Limbah elektronik yang harus disalurkan ke fasilitas khusus, dan residu yang sudah tidak dapat didaur ulang.
            </p>
            <div className="bg-bone rounded-xl p-4">
              <h3 className="font-bold text-veridian-leaf mb-2 flex items-center gap-2">
                <Info size={16} /> Contoh:
              </h3>
              <ul className="list-disc list-inside text-charcoal opacity-80 ml-1 space-y-1 text-sm">
                <li>Kabel, charger, HP rusak</li>
                <li>Popok bayi (diapers), pembalut</li>
                <li>Puntung rokok</li>
                <li>Struk belanja (thermal paper)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-deep-forest rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 text-[150px] opacity-10">🌍</div>
          <h2 className="text-3xl font-bold mb-4 relative z-10">Siap Mengubah Sampah Menjadi Reward?</h2>
          <p className="text-lg text-sapling-green mb-8 max-w-2xl mx-auto relative z-10">
            Setelah tahu cara memilah yang benar, sekarang saatnya setor ke bank sampah mitra kami.
          </p>
          <Link href="/auth/register" className="inline-block bg-sapling-green text-deep-forest font-bold py-3 px-8 rounded-full hover:bg-white transition-colors relative z-10">
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </main>
  );
}
