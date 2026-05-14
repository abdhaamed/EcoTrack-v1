"use client";

import { useOptimistic, useTransition } from "react";
import { submitWasteReport } from "@/app/actions/waste";
import { WasteReportPayload } from "@/types/waste";

interface Report {
  id: string;
  waste_type: string;
  status: string;
  created_at: string;
  isOptimistic?: boolean;
}

export default function OptimisticRecentReports({ initialReports }: { initialReports: Report[] }) {
  const [optimisticReports, addOptimisticReport] = useOptimistic(
    initialReports,
    (state, newReport: Report) => [newReport, ...state]
  );
  const [isPending, startTransition] = useTransition();

  const handleQuickReport = async () => {
    const newReport: Report = {
      id: Math.random().toString(),
      waste_type: "ORGANIK",
      status: "PENDING",
      created_at: new Date().toISOString(),
      isOptimistic: true,
    };

    startTransition(async () => {
      addOptimisticReport(newReport);
      
      const payload: WasteReportPayload = {
        userId: "00000000-0000-0000-0000-000000000000", // Placeholder
        wasteType: "ORGANIK",
        estimatedWeight: 1,
        photoUrl: "https://example.com/photo.jpg",
        locationAddress: "Lokasi Cepat",
        latitude: 0,
        longitude: 0,
      };

      await submitWasteReport(payload);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Laporan Terbaru</h3>
        <button
          onClick={handleQuickReport}
          disabled={isPending}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {isPending ? "Mengirim..." : "Lapor Cepat"}
        </button>
      </div>

      <div className="space-y-2">
        {optimisticReports.map((report) => (
          <div
            key={report.id}
            className={`p-4 rounded-xl border ${
              report.isOptimistic ? "bg-gray-50 border-dashed border-green-400 opacity-70" : "bg-white border-gray-100 shadow-sm"
            } transition-all`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{report.waste_type}</p>
                <p className="text-xs text-gray-500">
                  {new Date(report.created_at).toLocaleTimeString()}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                report.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
              }`}>
                {report.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
