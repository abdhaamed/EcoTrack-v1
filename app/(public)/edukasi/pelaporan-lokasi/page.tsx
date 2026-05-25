import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Map, BellRing, Users } from 'lucide-react';

export const metadata = {
  title: 'Pelaporan Berbasis Lokasi - EcoTrack',
  description: 'Laporkan titik penumpukan sampah liar di sekitarmu dan bantu pemerintah serta mitra pengelola mengambil tindakan cepat.',
};

export default function PelaporanLokasiPage() {
  return (
    <main className="min-h-screen bg-surface py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/#edukasi" className="inline-flex items-center gap-2 text-veridian-leaf hover:text-deep-forest font-medium mb-8 transition-colors">
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </Link>

        <div className="mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-sapling-green text-deep-forest text-sm font-bold tracking-wider mb-4">
            FITUR KOTA
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-deep-forest mb-6 font-display">
            Pelaporan Titik Sampah Liar
          </h1>
          <p className="text-lg text-charcoal opacity-80 leading-relaxed max-w-3xl">
            Sering melihat tumpukan sampah yang tidak dikelola di pinggir jalan atau area kosong? Dengan fitur pelaporan berbasis lokasi, kamu bisa menjadi mata dan telinga untuk lingkunganmu.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 border border-bone shadow-sm mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Map size={200} />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-deep-forest mb-6">Bagaimana Cara Kerjanya?</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-sapling-green opacity-30 text-deep-forest flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-deep-forest mb-1">Ambil Foto</h3>
                    <p className="text-charcoal opacity-80 text-sm">Temukan titik tumpukan sampah ilegal, ambil foto yang jelas sebagai bukti kondisi di lapangan.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-sapling-green opacity-30 text-deep-forest flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-deep-forest mb-1">Pin Lokasi GPS</h3>
                    <p className="text-charcoal opacity-80 text-sm">Sistem kami akan mendeteksi koordinat lokasimu secara otomatis untuk memastikan akurasi data.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-sapling-green opacity-30 text-deep-forest flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-deep-forest mb-1">Tindak Lanjut</h3>
                    <p className="text-charcoal opacity-80 text-sm">Laporan akan diteruskan ke dinas terkait atau mitra pembersih lokal untuk ditangani segera.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bone p-6 rounded-xl border border-bone">
              <h3 className="font-bold text-deep-forest mb-4 flex items-center gap-2">
                <BellRing size={20} /> Mengapa Ini Penting?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-accent-green"><MapPin size={18} /></div>
                  <p className="text-sm text-charcoal opacity-80"><strong>Pemetaan Akurat.</strong> Membantu pemerintah memetakan daerah rawan pembuangan ilegal.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-accent-green"><MapPin size={18} /></div>
                  <p className="text-sm text-charcoal opacity-80"><strong>Cegah Penyakit.</strong> Tumpukan sampah liar adalah sarang penyakit dan sumber bau tak sedap.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-accent-green"><MapPin size={18} /></div>
                  <p className="text-sm text-charcoal opacity-80"><strong>Aksi Nyata.</strong> Daripada sekadar mengeluh, kamu memberikan data yang bisa ditindaklanjuti.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-deep-forest rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute left-0 bottom-0 -ml-10 -mb-10 text-[150px] opacity-10">
            <Users size={200} />
          </div>
          <h2 className="text-3xl font-bold mb-4 relative z-10">Jadilah Penjaga Lingkunganmu</h2>
          <p className="text-lg text-sapling-green mb-8 max-w-2xl mx-auto relative z-10">
            Akses fitur lapor cepat di aplikasi EcoTrack sekarang dan bantu wujudkan lingkungan yang lebih bersih.
          </p>
          <Link href="/reports/create" className="inline-block bg-sapling-green text-deep-forest font-bold py-3 px-8 rounded-full hover:bg-white transition-colors relative z-10">
            Buat Laporan Sekarang
          </Link>
        </div>
      </div>
    </main>
  );
}
