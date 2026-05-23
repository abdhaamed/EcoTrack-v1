import { Suspense } from 'react';
import { getRewards, getUserPoints } from '@/app/actions/rewards';
import { RewardGrid } from '@/components/pages/rewards/RewardGrid';
import { Card } from '@/components/ui/Card';
import type { Reward } from '@/types/index';

export default async function RewardsPage() {
  const [rewardsResult, userPointsResult] = await Promise.all([
    getRewards(),
    getUserPoints(),
  ]);
  const rewards: Reward[] = rewardsResult.success ? rewardsResult.data || [] : [];
  const userPoints = userPointsResult.success ? userPointsResult.data ?? 0 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Rewards</h1>
          <p className="mt-1 text-muted">
            Tukarkan poin Anda dengan reward menarik
          </p>
        </div>
        <Card variant="bone" className="px-4 py-3">
          <p className="text-sm text-muted">Poin Anda</p>
          <p className="text-xl font-bold text-veridian-leaf">
            {userPoints.toLocaleString()}
          </p>
        </Card>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <RewardGrid rewards={rewards} userPoints={userPoints} />
      </Suspense>
    </div>
  );
}
