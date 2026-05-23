import { Suspense } from 'react';
import { getRedemptions } from '@/app/actions/rewards';
import { RedemptionsList } from '@/components/pages/rewards/RedemptionsList';
import type { RewardRedemption, Reward } from '@/types/index';

export default async function RedemptionsPage() {
  // Mock user ID - in real app, get from session
  const userId = 'mock-user-1';
  const result = await getRedemptions(userId);
  const redemptions: (RewardRedemption & { reward?: Reward })[] = result.success
    ? (result.data || []).map((r: RewardRedemption) => ({
        ...r,
        reward: { id: r.rewardId, name: 'Reward Item', description: '', imageUrl: '', points_required: r.pointsSpent, stock: 0, is_active: true, createdAt: '' } as Reward,
      }))
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Redemption Saya</h1>
        <p className="mt-1 text-muted">
          Lacak status reward yang Anda tukar
        </p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <RedemptionsList redemptions={redemptions} />
      </Suspense>
    </div>
  );
}
