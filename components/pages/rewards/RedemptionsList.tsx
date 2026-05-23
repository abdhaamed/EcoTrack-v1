'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { RewardRedemption, Reward } from '@/types/index';

interface RedemptionsListProps {
  redemptions: (RewardRedemption & { reward?: Reward })[];
  isLoading?: boolean;
}

const statusConfig = {
  PROCESSING: {
    badge: 'neutral' as const,
    label: 'Diproses',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  SHIPPED: {
    badge: 'warning' as const,
    label: 'Dikirim',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  COMPLETED: {
    badge: 'success' as const,
    label: 'Selesai',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
};

export function RedemptionsList({ redemptions, isLoading }: RedemptionsListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} variant="bone" className="p-4">
            <div className="space-y-2">
              <div className="h-5 w-48 animate-pulse rounded bg-bone" />
              <div className="h-4 w-32 animate-pulse rounded bg-bone" />
              <div className="h-4 w-full animate-pulse rounded bg-bone" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (redemptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="mb-4 h-16 w-16 text-muted"
        >
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
        <h3 className="mb-2 text-lg font-semibold text-charcoal">Belum ada redemption</h3>
        <p className="text-sm text-muted">
          Reward yang Anda tukar akan muncul di sini
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {redemptions.map((redemption) => {
        const config = statusConfig[redemption.status];
        const isExpanded = expandedId === redemption.id;

        return (
          <Card key={redemption.id} variant="bone" className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-charcoal">
                    {redemption.reward?.name || 'Reward'}
                  </h4>
                  <Badge variant={config.badge} className="gap-1">
                    {config.icon}
                    {config.label}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {redemption.pointsSpent.toLocaleString()} poin
                </p>
                <p className="mt-1 text-xs text-muted">
                  {new Date(redemption.createdAt).toLocaleDateString('id-ID', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>

                {isExpanded && (
                  <div className="mt-3 space-y-2 border-t border-mist pt-3">
                    <div>
                      <p className="text-xs font-medium text-muted">Alamat Pengiriman</p>
                      <p className="text-sm text-charcoal">{redemption.deliveryAddress}</p>
                    </div>
                    {redemption.trackingNote && (
                      <div>
                        <p className="text-xs font-medium text-muted">Nomor Resi</p>
                        <p className="text-sm text-charcoal">{redemption.trackingNote}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {redemption.trackingNote && (
                <Button
                  variant="ghost"
                  className="text-xs"
                  onClick={() => setExpandedId(isExpanded ? null : redemption.id)}
                >
                  {isExpanded ? 'Sembunyikan' : 'Detail'}
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
