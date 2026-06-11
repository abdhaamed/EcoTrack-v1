"use client";

import DashboardTopbar from "@/components/pages/dashboard/DashboardTopbar";
import { useState, useEffect } from "react";
import { Truck, MapPin, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { submitPickupRequest } from "@/app/actions/pickup";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
  loading: () => <div className="h-[250px] w-full rounded-xl bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Memuat Peta...</div>
});

export default function PickupPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [wasteType, setWasteType] = useState("ORGANIK");
  const [estimatedWeight, setEstimatedWeight] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUserId();
  }, []);

  const updateAddressFromCoordinates = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        { headers: { 'Accept-Language': 'id' } }
      );
      const data = await response.json();
      const newAddress = data.address?.city || data.address?.town || data.address?.village || data.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
      // Hanya mengisikan alamat jika alamat saat ini kosong untuk membantu user
      if (!address) setAddress(newAddress);
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
    updateAddressFromCoordinates(lat, lng);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setMessage({ type: 'error', text: "Anda harus login terlebih dahulu." });
      return;
    }
    
    if (!latitude || !longitude) {
      setMessage({ type: 'error', text: "Silakan pilih titik penjemputan di Peta." });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const result = await submitPickupRequest({
      userId,
      wasteType,
      estimatedWeight: parseFloat(estimatedWeight),
      pickupDate,
      pickupTime,
      address,
      latitude,
      longitude,
    });

    if (result.success) {
      setMessage({ type: 'success', text: "Layanan penjemputan berhasil dipesan! Petugas kami akan menghubungi Anda." });
      setTimeout(() => router.push('/dashboard/reports'), 2500);
    } else {
      setMessage({ type: 'error', text: result.error || "Gagal memesan penjemputan." });
      setIsLoading(false);
    }
  };

  // Get tomorrow's date for minimum date input
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <>
      <DashboardTopbar />
      <div className="dashboard-content max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-700 mb-4">
            <Truck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Layanan Jemput Sampah</h1>
          <p className="text-gray-600">Tidak ada waktu ke Bank Sampah? Pesan layanan penjemputan, biar petugas kami yang datang ke rumah Anda.</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${
            message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-medium text-gray-700">Jenis Sampah</label>
              <select 
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              >
                <option value="ORGANIK">Organik (Sisa Makanan, Daun)</option>
                <option value="ANORGANIK">Anorganik (Plastik, Kertas, Kaca)</option>
                <option value="B3">B3 (Baterai, Elektronik Bekas)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-gray-700">Perkiraan Berat (Kg)</label>
              <input 
                type="number" 
                value={estimatedWeight}
                onChange={(e) => setEstimatedWeight(e.target.value)}
                placeholder="Misal: 5"
                min="1"
                step="0.5"
                required
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" /> Tanggal Penjemputan
              </label>
              <input 
                type="date" 
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={minDate}
                required
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" /> Waktu Penjemputan
              </label>
              <select 
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              >
                <option value="">Pilih rentang waktu</option>
                <option value="08:00 - 10:00">Pagi (08:00 - 10:00)</option>
                <option value="10:00 - 12:00">Siang (10:00 - 12:00)</option>
                <option value="13:00 - 15:00">Sore (13:00 - 15:00)</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" /> Tentukan Lokasi Penjemputan di Peta
            </label>
            <MapPicker onLocationSelect={handleLocationSelect} />
            {latitude && longitude && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-700">
                Titik penjemputan terkunci di koordinat: {latitude.toFixed(5)}, {longitude.toFixed(5)}
              </div>
            )}
            
            <textarea 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Tambahkan detail alamat lengkap berserta patokan rumah..."
              rows={3}
              required
              className="w-full mt-2 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-gray-500 max-w-sm">
              *Petugas kami akan menghubungi Anda melalui nomor telepon yang terdaftar pada akun Anda sebelum melakukan penjemputan.
            </p>
            <button 
              type="submit"
              disabled={isLoading || !userId}
              className="px-8 py-3.5 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 disabled:opacity-50 transition-all shadow-md flex items-center gap-2"
            >
              {isLoading ? "Memproses..." : (
                <>
                  Pesan Penjemputan <Truck className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// Force Next.js HMR

