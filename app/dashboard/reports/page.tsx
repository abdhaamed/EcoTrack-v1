import DashboardTopbar from "@/components/pages/dashboard/DashboardTopbar";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Clock, CheckCircle, AlertTriangle, FileText, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Semua Laporan - EcoTrack",
};

export default async function ReportsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let reports: any[] = [];
  let success = false;
  let errorMsg = "";

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE !== "true") {
    const { data, error } = await supabase
      .from("waste_reports")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      errorMsg = "Gagal memuat riwayat laporan.";
    } else {
      success = true;
      reports = data || [];
    }
  } else {
    success = true;
  }

  return (
    <>
      <DashboardTopbar />
      <div className="dashboard-content max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Semua Laporan</h1>
            <p className="text-gray-600">Daftar seluruh laporan sampah yang pernah Anda kirimkan.</p>
          </div>
          <Link href="/reports/create" className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
            + Buat Laporan
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {!success ? (
            <div className="p-6 text-red-500 text-center bg-red-50">{errorMsg}</div>
          ) : reports.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {reports.map((report) => (
                <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-6 md:items-center justify-between">
                  
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full flex-shrink-0 ${
                      report.status === 'APPROVED' ? 'bg-green-100 text-green-600' :
                      report.status === 'REJECTED' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {report.status === 'APPROVED' ? <CheckCircle className="w-6 h-6" /> : 
                       report.status === 'REJECTED' ? <AlertTriangle className="w-6 h-6" /> : 
                       <Clock className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                        Laporan #{report.id.substring(0, 8)}
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${
                          report.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' :
                          report.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }`}>
                          {report.status === 'APPROVED' ? 'SELESAI' : report.status === 'REJECTED' ? 'DITOLAK' : 'MENUNGGU'}
                        </span>
                      </h3>
                      
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span>{report.waste_type} - {report.estimated_weight} Kg</span>
                        </div>
                        {report.location_address && (
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                            <span className="line-clamp-1">{report.location_address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 font-medium pl-14 md:pl-0 whitespace-nowrap">
                    {new Date(report.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Belum Ada Laporan</h3>
              <p className="text-gray-500">Anda belum pernah membuat laporan sampah. Mari mulai peduli lingkungan!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
