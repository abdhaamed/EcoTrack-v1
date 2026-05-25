import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Target, Users, Medal } from 'lucide-react';

export const metadata = {
  title: 'Komunitas & Tantangan - EcoTrack',
  description: 'Bergabunglah dalam challenge komunitas, bersaing di leaderboard, dan jadilah agen perubahan lingkungan.',
};

export default function KomunitasTantanganPage() {
  return (
    <main className="min-h-screen bg-surface py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/#edukasi" className="inline-flex items-center gap-2 text-veridian-leaf hover:text-deep-forest font-medium mb-8 transition-colors">
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </Link>

        <div className="mb-12 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-sapling-green text-deep-forest text-sm font-bold tracking-wider mb-4">
            BERSAMA LEBIH KUAT
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-deep-forest mb-6 font-display">
            Komunitas & Tantangan
          </h1>
          <p className="text-lg text-charcoal opacity-80 leading-relaxed max-w-2xl mx-auto">
            Menyelamatkan lingkungan tidak harus membosankan. Di EcoTrack, pengelolaan sampah diubah menjadi pengalaman gamifikasi yang seru bersama ribuan pengguna lainnya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Fitur 1 */}
          <div className="bg-white rounded-2xl p-8 border border-bone shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-6">
              <Trophy size={28} />
            </div>
            <h2 className="text-2xl font-bold text-deep-forest mb-3">Leaderboard Global</h2>
            <p className="text-charcoal opacity-80 leading-relaxed">
              Bandingkan dampak lingkunganmu dengan pengguna lain di kotamu atau secara nasional. Kumpulkan poin sebanyak mungkin dan jadilah "Eco Warrior" terbaik bulan ini.
            </p>
          </div>

          {/* Fitur 2 */}
          <div className="bg-white rounded-2xl p-8 border border-bone shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-6">
              <Target size={28} />
            </div>
            <h2 className="text-2xl font-bold text-deep-forest mb-3">Tantangan Bulanan</h2>
            <p className="text-charcoal opacity-80 leading-relaxed">
              Ikuti misi spesifik, misalnya: "Setor 10kg Kertas Bulan Ini" atau "Laporkan 5 Titik Sampah Liar". Selesaikan misi untuk mendapatkan badge khusus dan ekstra poin reward.
            </p>
          </div>

          {/* Fitur 3 */}
          <div className="bg-white rounded-2xl p-8 border border-bone shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
              <Users size={28} />
            </div>
            <h2 className="text-2xl font-bold text-deep-forest mb-3">Sinergi Komunitas</h2>
            <p className="text-charcoal opacity-80 leading-relaxed">
              Bergabung dengan grup lingkungan lokal, bagikan tips daur ulang, atau inisiasi acara kerja bakti lingkungan di daerahmu langsung melalui platform kami.
            </p>
          </div>

          {/* Fitur 4 */}
          <div className="bg-white rounded-2xl p-8 border border-bone shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Medal size={28} />
            </div>
            <h2 className="text-2xl font-bold text-deep-forest mb-3">Sistem Poin & Reward</h2>
            <p className="text-charcoal opacity-80 leading-relaxed">
              Bukan sekadar poin angka. Poin yang kamu kumpulkan dapat ditukarkan dengan berbagai voucher diskon menarik dari merchant-mitra ramah lingkungan kami.
            </p>
          </div>
        </div>

        <div className="bg-deep-forest rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="text-white max-w-lg">
            <h2 className="text-3xl font-bold mb-3">Siap Beraksi Bersama?</h2>
            <p className="text-sapling-green mb-0">
              Jangan lakukan sendiri. Temukan teman baru dan jadikan persaingan sehat sebagai motivasi untuk bumi yang lebih sehat.
            </p>
          </div>
          <Link href="/auth/register" className="inline-block whitespace-nowrap bg-sapling-green text-deep-forest font-bold py-3 px-8 rounded-full hover:bg-white transition-colors">
            Gabung Komunitas
          </Link>
        </div>
      </div>
    </main>
  );
}
