"use client";

import { useState, useEffect } from "react";
import { Upload, CheckCircle2, AlertCircle, MapPin, Loader } from "lucide-react";
import { submitWasteReport } from "@/app/actions/waste";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function CreateReportPage() {
  const router = useRouter();
  const [wasteType, setWasteType] = useState("ORGANIK");
  const [estimatedWeight, setEstimatedWeight] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationAddress, setLocationAddress] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Get current user ID on mount
  useEffect(() => {
    const getUserId = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUserId();
  }, []);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhotoName(file ? file.name : "");
  };

  // Reverse geocoding using Nominatim (OpenStreetMap)
  const getAddressFromCoordinates = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        { headers: { 'Accept-Language': 'id' } }
      );
      const data = await response.json();
      return data.address?.city || data.address?.town || data.address?.village || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    } catch (error) {
      console.error('Geocoding error:', error);
      return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("❌ Browser tidak mendukung GPS");
      return;
    }

    setIsDetectingLocation(true);
    setLocationStatus("📍 Mendeteksi lokasi...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);

        // Get address from coordinates
        const address = await getAddressFromCoordinates(lat, lon);
        setLocationAddress(address);
        setLocationStatus("✅ Lokasi GPS berhasil dideteksi");
        setIsDetectingLocation(false);
      },
      (error) => {
        let errorMsg = "❌ Gagal mengambil lokasi dari GPS";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "❌ Izin lokasi ditolak. Silakan aktifkan izin GPS di browser";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = "❌ Informasi lokasi tidak tersedia";
        } else if (error.code === error.TIMEOUT) {
          errorMsg = "❌ Waktu pencarian lokasi habis";
        }
        setLocationStatus(errorMsg);
        setIsDetectingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userId) {
      setMessage({ type: 'error', text: "Anda harus login untuk mengirim laporan" });
      return;
    }

    if (!latitude || !longitude) {
      setMessage({ type: 'error', text: "Silakan deteksi lokasi terlebih dahulu" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const payload = {
      userId: userId,
      wasteType: wasteType,
      estimatedWeight: parseFloat(estimatedWeight),
      photoUrl: "https://example.com/mock-upload.jpg", // Placeholder for actual upload
      locationAddress: locationAddress || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
      latitude: latitude,
      longitude: longitude,
    };

    const result = await submitWasteReport(payload);

    if (result.success) {
      setMessage({ type: 'success', text: "Laporan berhasil dikirim! Mengalihkan ke dashboard..." });
      setTimeout(() => router.push('/dashboard'), 2000);
    } else {
      setMessage({ type: 'error', text: result.error || "Gagal mengirim laporan" });
      setIsLoading(false);
    }
  };

  return (
    <div className="report-form max-w-2xl mx-auto p-6" data-component="CreateReportPage">
      <div className="report-header mb-8">
        <h1 className="text-3xl font-bold text-deep-forest">Waste Report Form</h1>
        <p className="text-mist">Laporkan aktivitas pengelolaan sampah Anda</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${
          message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
          <div className="field flex flex-col gap-2">
            <label className="font-medium text-charcoal">Waste Type</label>
            <select
              value={wasteType}
              onChange={(event) => setWasteType(event.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 transition-all outline-none"
            >
              <option value="ORGANIK">Organik</option>
              <option value="ANORGANIK">Anorganik</option>
              <option value="B3">B3 (Bahan Berbahaya)</option>
              <option value="RESIDU">Residu</option>
            </select>
          </div>

          <div className="field flex flex-col gap-2">
            <label className="font-medium text-charcoal">Estimated Weight (kg)</label>
            <input
              type="number"
              value={estimatedWeight}
              onChange={(event) => setEstimatedWeight(event.target.value)}
              placeholder="0"
              min="0.1"
              step="0.1"
              required
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 transition-all outline-none"
            />
          </div>

          <div className="field flex flex-col gap-2">
            <label className="font-medium text-charcoal">Photo</label>
            <label className="photo-dropzone border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all">
              <Upload className="text-gray-400" size={32} />
              <span className="font-medium text-charcoal">Click to upload photo</span>
              <span className="text-sm text-mist">PNG, JPG up to 10MB</span>
              {photoName && <span className="mt-2 text-green-600 font-medium">{photoName}</span>}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="field flex flex-col gap-2">
            <label className="font-medium text-charcoal">Location</label>
            <div className="space-y-3 relative">
              <button 
                type="button" 
                disabled={isDetectingLocation}
                className="w-full px-4 py-4 bg-green-700 text-white rounded-xl hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold flex items-center justify-center gap-2 shadow-lg" 
                onClick={handleDetectLocation}
              >
                {isDetectingLocation ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Mendeteksi Lokasi...
                  </>
                ) : (
                  <>
                    <MapPin size={18} />
                    Detect Location
                  </>
                )}
              </button>
              
              {locationStatus && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white border-2 border-gray-300 rounded-xl px-6 py-3 shadow-xl max-w-sm animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-sm font-medium text-gray-900 text-center">{locationStatus}</p>
                </div>
              )}
              
              {latitude && longitude && (
                <div className="p-4 bg-green-100 opacity-75 rounded-xl border border-green-300 space-y-2">
                  <p className="text-sm font-medium text-green-800">
                    📍 {locationAddress}
                  </p>
                  <p className="text-xs text-green-600">
                    Koordinat: {latitude.toFixed(6)}, {longitude.toFixed(6)}
                  </p>
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !userId}
            className="w-full py-4 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {isLoading ? "Mengirim Laporan..." : "Submit Report"}
          </button>
        </form>
    </div>
  );
}