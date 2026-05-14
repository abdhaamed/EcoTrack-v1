"use client";

import { useState, useEffect } from "react";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";
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
  const [locationStatus, setLocationStatus] = useState("");
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

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Browser tidak mendukung GPS");
      return;
    }

    setLocationStatus("Mendeteksi lokasi...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocationStatus("Lokasi GPS berhasil dideteksi");
      },
      () => setLocationStatus("Gagal mengambil lokasi dari GPS"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userId) {
      setMessage({ type: 'error', text: "Anda harus login untuk mengirim laporan" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const payload = {
      userId: userId,
      wasteType: wasteType,
      estimatedWeight: parseFloat(estimatedWeight),
      photoUrl: "https://example.com/mock-upload.jpg", // Placeholder for actual upload
      locationAddress: "Deteksi GPS",
      latitude: latitude || 0,
      longitude: longitude || 0,
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
            <div className="flex gap-3 items-center">
              <button 
                type="button" 
                className="px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-black transition-all text-sm" 
                onClick={handleDetectLocation}
              >
                Detect Location
              </button>
              <p className="text-sm text-mist">{locationStatus}</p>
            </div>
            {latitude && longitude && (
              <p className="text-xs text-gray-400">Coords: {latitude.toFixed(4)}, {longitude.toFixed(4)}</p>
            )}
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