import { Suspense } from 'react';
import { getAllRewards } from '@/app/actions/rewards';
import { AdminRewardTable } from '@/components/pages/admin/rewards/AdminRewardTable';
import type { Reward } from '@/types/index';

export default async function AdminRewardsPage() {
  const result = await getAllRewards();
  const rewards: Reward[] = result.success ? result.data || [] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Kelola Rewards</h1>
        <p className="mt-1 text-muted">
          Buat, edit, dan hapus reward untuk pengguna
        </p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <AdminRewardTable rewards={rewards} />
      </Suspense>
    </div>
  );
}
