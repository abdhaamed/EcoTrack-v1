'use client';

import { useState, useMemo } from 'react';
import { RewardCard, RewardCardSkeleton } from './RewardCard';
import { RewardRedeemModal } from './RewardRedeemModal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { Reward } from '@/types/index';

interface RewardGridProps {
  rewards: Reward[];
  isLoading?: boolean;
  userPoints?: number;
}

type SortOption = 'points-asc' | 'points-desc' | 'stock';

export function RewardGrid({ rewards, isLoading, userPoints = 0 }: RewardGridProps) {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('points-asc');
  const [filterStock, setFilterStock] = useState<'all' | 'available'>('all');
  const [minPoints, setMinPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(5000);

  const filteredAndSortedRewards = useMemo(() => {
    let result = [...rewards];

    // Filter by stock
    if (filterStock === 'available') {
      result = result.filter((r) => r.stock > 0);
    }

    // Filter by points range
    result = result.filter(
      (r) => r.points_required >= minPoints && r.points_required <= maxPoints
    );

    // Sort
    switch (sortBy) {
      case 'points-asc':
        result.sort((a, b) => a.points_required - b.points_required);
        break;
      case 'points-desc':
        result.sort((a, b) => b.points_required - a.points_required);
        break;
      case 'stock':
        result.sort((a, b) => b.stock - a.stock);
        break;
    }

    return result;
  }, [rewards, sortBy, filterStock, minPoints, maxPoints]);

  const handleRedeem = (reward: Reward) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReward(null);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(6)].map((_, i) => (
          <RewardCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters & Sort */}
      <div className="flex flex-wrap items-center gap-4 rounded-card bg-bone p-4">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-charcoal">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-input border border-mist bg-parchment px-3 py-1.5 text-sm text-charcoal focus:border-deep-forest focus:outline-none focus:ring-1 focus:ring-deep-forest"
          >
            <option value="points-asc">Poin: Rendah → Tinggi</option>
            <option value="points-desc">Poin: Tinggi → Rendah</option>
            <option value="stock">Stok: Terbanyak</option>
          </select>
        </div>

        {/* Stock Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-charcoal">Stok:</label>
          <div className="flex gap-1">
            <Button
              variant={filterStock === 'all' ? 'primary' : 'ghost'}
              className="px-2 py-1 text-xs"
              onClick={() => setFilterStock('all')}
            >
              Semua
            </Button>
            <Button
              variant={filterStock === 'available' ? 'primary' : 'ghost'}
              className="px-2 py-1 text-xs"
              onClick={() => setFilterStock('available')}
            >
              Tersedia
            </Button>
          </div>
        </div>

        {/* Points Range */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-charcoal">Poin:</label>
          <input
            type="number"
            value={minPoints}
            onChange={(e) => setMinPoints(Number(e.target.value))}
            className="w-20 rounded-input border border-mist bg-parchment px-2 py-1.5 text-sm text-charcoal focus:border-deep-forest focus:outline-none"
            placeholder="Min"
          />
          <span className="text-muted">-</span>
          <input
            type="number"
            value={maxPoints}
            onChange={(e) => setMaxPoints(Number(e.target.value))}
            className="w-20 rounded-input border border-mist bg-parchment px-2 py-1.5 text-sm text-charcoal focus:border-deep-forest focus:outline-none"
            placeholder="Max"
          />
        </div>

        {/* Results count */}
        <div className="ml-auto">
          <Badge variant="neutral">
            {filteredAndSortedRewards.length} reward
            {filteredAndSortedRewards.length !== rewards.length && ` (${rewards.length} total)`}
          </Badge>
        </div>
      </div>

      {/* Grid */}
      {filteredAndSortedRewards.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedRewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              onRedeem={handleRedeem}
              userPoints={userPoints}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mb-4 h-16 w-16 text-muted"
          >
            <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
          </svg>
          <h3 className="mb-2 text-lg font-semibold text-charcoal">Belum ada reward tersedia</h3>
          <p className="text-sm text-muted">
            Coba ubah filter atau cek kembali nanti
          </p>
        </div>
      )}

      {/* Redeem Modal */}
      <RewardRedeemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        reward={selectedReward}
        userPoints={userPoints}
      />
    </div>
  );
}
