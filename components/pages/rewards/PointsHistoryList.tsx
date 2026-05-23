'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { PointTransaction } from '@/types/index';

interface PointsHistoryListProps {
  transactions: PointTransaction[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function PointsHistoryList({
  transactions,
  isLoading,
  onLoadMore,
  hasMore = false,
}: PointsHistoryListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Card key={i} variant="bone" className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-bone" />
                <div className="h-3 w-24 animate-pulse rounded bg-bone" />
              </div>
              <div className="h-6 w-16 animate-pulse rounded bg-bone" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="mb-4 h-16 w-16 text-muted"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <h3 className="mb-2 text-lg font-semibold text-charcoal">Belum ada riwayat poin</h3>
        <p className="text-sm text-muted">
          Poin akan muncul di sini setelah Anda melaporkan sampah atau menukar reward
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <Card key={transaction.id} variant="bone" className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="font-medium text-charcoal">{transaction.description}</p>
              <p className="mt-1 text-sm text-muted">
                {new Date(transaction.createdAt).toLocaleDateString('id-ID', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={transaction.transactionType === 'CREDIT' ? 'success' : 'neutral'}
              >
                <span className={transaction.transactionType === 'CREDIT' ? 'text-veridian-leaf' : 'text-muted'}>
                  {transaction.transactionType === 'CREDIT' ? '+' : '-'}
                  {transaction.points.toLocaleString()}
                </span>
              </Badge>
            </div>
          </div>
        </Card>
      ))}

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onLoadMore}
            className="rounded-btn bg-bone px-6 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-sapling-green/30"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
