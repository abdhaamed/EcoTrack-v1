"use client";

import { useState } from "react";
import { validateWasteReport } from "@/app/actions/admin";
import { Check, X, Loader2 } from "lucide-react";

export default function AdminReportList({ initialReports }: { initialReports: any[] }) {
  const [reports, setReports] = useState(initialReports);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (reportId: string, userId: string, status: "APPROVED" | "REJECTED") => {
    setLoadingId(reportId);
    
    try {
      const res = await validateWasteReport(reportId, userId, status, 50, "Validasi Admin");
      if (res.success) {
        setReports(reports.filter(r => r.id !== reportId));
        alert(`Laporan berhasil di-${status.toLowerCase()}`);
      } else {
        alert("Gagal memproses laporan: " + res.error);
      }
    } catch (error) {
      alert("Terjadi kesalahan sistem");
    } finally {
      setLoadingId(null);
    }
  };

  if (reports.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100 text-center text-gray-500">
        Tidak ada laporan yang perlu divalidasi.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Foto</th>
              <th className="px-6 py-4">Pengguna</th>
              <th className="px-6 py-4">Jenis & Berat</th>
              <th className="px-6 py-4">Lokasi</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={report.photo_url || "https://via.placeholder.com/150"} 
                    alt="Sampah" 
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200 bg-gray-50"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{report.users?.name || 'Anonim'}</div>
                  <div className="text-gray-500 text-xs">{report.users?.email || '-'}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium mb-1">
                    {report.waste_type}
                  </div>
                  <div className="text-gray-600">~{report.estimated_weight} kg</div>
                </td>
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                  {report.location_address}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleAction(report.id, report.user_id, "APPROVED")}
                      disabled={loadingId === report.id}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Setujui Laporan"
                    >
                      {loadingId === report.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => handleAction(report.id, report.user_id, "REJECTED")}
                      disabled={loadingId === report.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Tolak Laporan"
                    >
                      {loadingId === report.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <X className="w-5 h-5" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
