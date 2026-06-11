import React from 'react';
import { ServicesHero } from '@/components/pages/services/ServicesHero';
import { ServiceCard } from '@/components/pages/services/ServiceCard';
import { Recycle, Truck, Leaf, BarChart3, Users, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Layanan - EcoTrack',
  description: 'Layanan pengelolaan sampah EcoTrack',
};

const services = [
  {
    icon: Recycle,
    title: 'Daur Ulang Terpadu',
    description: 'Sistem daur ulang modern yang memisahkan sampah organik dan anorganik secara efisien untuk meminimalkan limbah ke TPA.',
  },
  {
    icon: Truck,
    title: 'Penjemputan Rutin',
    description: 'Layanan penjemputan sampah terjadwal langsung dari lokasi Anda dengan armada ramah lingkungan kami.',
  },
  {
    icon: Leaf,
    title: 'Pengolahan Kompos',
    description: 'Mengubah limbah organik menjadi pupuk kompos berkualitas tinggi yang dapat digunakan kembali untuk pertanian.',
  },
  {
    icon: BarChart3,
    title: 'Laporan Dampak',
    description: 'Pantau kontribusi Anda terhadap lingkungan dengan laporan detail mengenai jumlah sampah yang berhasil didaur ulang.',
  },
  {
    icon: Users,
    title: 'Edukasi Komunitas',
    description: 'Program pelatihan dan workshop untuk masyarakat tentang pentingnya pengelolaan sampah yang bertanggung jawab.',
  },
  {
    icon: ShieldCheck,
    title: 'Sertifikasi Hijau',
    description: 'Bantuan dan pendampingan bagi bisnis untuk mendapatkan sertifikasi standar lingkungan dan pengelolaan limbah.',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-surface">
      <ServicesHero />
      
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder for CtaSection since it might not be implemented yet in parallel tasks */}
      <section data-component="CtaSection" className="bg-veridian-leaf text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 font-article">Siap Memulai Perubahan?</h2>
          <p className="text-lg mb-8 text-sapling-green">Bergabunglah dengan ribuan pengguna lainnya dalam misi menyelamatkan lingkungan.</p>
          <button className="bg-sapling-green text-deep-forest px-8 py-3 rounded-btn font-bold hover:bg-white transition-colors">
            Hubungi Kami
          </button>
        </div>
      </section>
    </main>
  );
}
