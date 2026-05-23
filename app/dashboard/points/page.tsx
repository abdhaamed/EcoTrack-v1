import { Suspense } from 'react';
import { getPointHistory } from '@/app/actions/rewards';
import { PointsHistoryList } from '@/components/pages/rewards/PointsHistoryList';
import { Card } from '@/components/ui/Card';
import type { PointTransaction } from '@/types/index';

export default async function PointsPage() {
  // Mock user ID - in real app, get from session
  const userId = 'mock-user-1';
  const result = await getPointHistory(userId);
  const transactions: PointTransaction[] = result.success ? result.data || [] : [];

  // Calculate totals
  const totalCredit = transactions
    .filter((t) => t.transactionType === 'CREDIT')
    .reduce((sum, t) => sum + t.points, 0);
  const totalDebit = transactions
    .filter((t) => t.transactionType === 'DEBIT')
    .reduce((sum, t) => sum + t.points, 0);
  const currentBalance = totalCredit - totalDebit;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Riwayat Poin</h1>
        <p className="mt-1 text-muted">
          Lihat semua transaksi poin Anda
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card variant="bone" className="p-4">
          <p className="text-sm text-muted">Poin Masuk</p>
          <p className="mt-1 text-xl font-bold text-veridian-leaf">
            +{totalCredit.toLocaleString()}
          </p>
        </Card>
        <Card variant="bone" className="p-4">
          <p className="text-sm text-muted">Poin Keluar</p>
          <p className="mt-1 text-xl font-bold text-feedback-error">
            -{totalDebit.toLocaleString()}
          </p>
        </Card>
        <Card variant="bone" className="p-4">
          <p className="text-sm text-muted">Saldo</p>
          <p className="mt-1 text-xl font-bold text-deep-forest">
            {currentBalance.toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Transaction List */}
      <Suspense fallback={<div>Loading...</div>}>
        <PointsHistoryList transactions={transactions} />
      </Suspense>
    </div>
  );
}
