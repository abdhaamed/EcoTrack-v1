'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { Reward } from '@/types/index';

interface RewardCardProps {
  reward: Reward;
  onRedeem?: (reward: Reward) => void;
  userPoints?: number;
}

export function RewardCard({ reward, onRedeem, userPoints = 0 }: RewardCardProps) {
  const isSoldOut = reward.stock <= 0;
  const canAfford = userPoints >= reward.points_required;
  const isDisabled = isSoldOut || !canAfford;

  const stockPercentage = Math.min((reward.stock / 20) * 100, 100);

  return (
    <Card
      variant="bone"
      className={`reward-card group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
        isSoldOut ? 'opacity-60' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative h-40 w-full overflow-hidden rounded-t-card bg-bone">
        {reward.imageUrl ? (
          <img
            src={reward.imageUrl}
            alt={reward.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-sapling-green/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-16 w-16 text-veridian-leaf"
            >
              <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
            </svg>
          </div>
        )}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50">
            <Badge variant="error">Sold Out</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-charcoal line-clamp-1">
          {reward.name}
        </h3>
        <p className="mb-3 text-sm text-muted line-clamp-2">
          {reward.description}
        </p>

        {/* Points Required */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-muted">Poin dibutuhkan:</span>
          <span className="font-bold text-deep-forest">{reward.points_required.toLocaleString()}</span>
        </div>

        {/* Stock Progress */}
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-muted">Stok tersedia</span>
            <span className="font-medium text-charcoal">{reward.stock}/20</span>
          </div>
          <ProgressBar
            value={stockPercentage}
            variant={reward.stock > 5 ? 'faint' : 'primary'}
          />
        </div>

        {/* Redeem Button */}
        <Button
          variant={isDisabled ? 'outlined' : 'secondary'}
          className="w-full"
          disabled={isDisabled}
          onClick={() => onRedeem?.(reward)}
        >
          {isSoldOut
            ? 'Stok Habis'
            : !canAfford
            ? `Butuh ${(reward.points_required - userPoints).toLocaleString()} lagi`
            : 'Tukar Reward'}
        </Button>
      </div>
    </Card>
  );
}

export function RewardCardSkeleton() {
  return (
    <Card variant="bone" className="overflow-hidden">
      <div className="h-40 w-full animate-pulse bg-bone" />
      <div className="p-4">
        <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-bone" />
        <div className="mb-4 h-4 w-full animate-pulse rounded bg-bone" />
        <div className="mb-3 h-4 w-1/2 animate-pulse rounded bg-bone" />
        <div className="mb-4 h-4 w-full animate-pulse rounded bg-bone" />
        <div className="h-10 w-full animate-pulse rounded-btn bg-bone" />
      </div>
    </Card>
  );
}
