import { getPendingReports } from "@/app/actions/admin";
import AdminReportList from "@/components/pages/dashboard/AdminReportList";

export const metadata = {
  title: "Admin Dashboard - Validasi Laporan",
};

export default async function AdminDashboardPage() {
  const { data: reports, success } = await getPendingReports();

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Validasi Laporan Sampah</h1>
        <p className="text-gray-500 mt-1">Tinjau dan berikan poin untuk laporan pengumpulan sampah dari masyarakat.</p>
      </div>

      {!success ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
          Gagal memuat daftar laporan dari server.
        </div>
      ) : (
        <AdminReportList initialReports={reports || []} />
      )}
    </div>
  );
}
