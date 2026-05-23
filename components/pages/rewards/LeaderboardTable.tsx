'use client';

import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import type { User } from '@/types/index';

interface LeaderboardTableProps {
  users: (User & { rank?: number })[];
  currentUserId?: string;
  isLoading?: boolean;
}

const medalColors = {
  1: { bg: '#D4AF37', text: '#FFFFFF', icon: '👑' },
  2: { bg: '#C0C0C0', text: '#FFFFFF', icon: '🥈' },
  3: { bg: '#CD7F32', text: '#FFFFFF', icon: '🥉' },
};

export function LeaderboardTable({ users, currentUserId, isLoading }: LeaderboardTableProps) {
  if (isLoading) {
    return (
      <Card variant="bone" className="overflow-hidden">
        <div className="divide-y divide-mist">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <div className="h-8 w-8 animate-pulse rounded-full bg-bone" />
              <div className="h-10 w-10 animate-pulse rounded-full bg-bone" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-bone" />
                <div className="h-3 w-24 animate-pulse rounded bg-bone" />
              </div>
              <div className="h-6 w-16 animate-pulse rounded bg-bone" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="mb-4 h-16 w-16 text-muted"
        >
          <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
          <circle cx="12" cy="8" r="7" />
        </svg>
        <h3 className="mb-2 text-lg font-semibold text-charcoal">Belum ada data</h3>
        <p className="text-sm text-muted">
          Leaderboard akan muncul setelah ada pengguna yang mengumpulkan poin
        </p>
      </div>
    );
  }

  return (
    <Card variant="bone" className="overflow-hidden">
      <div className="divide-y divide-mist">
        {users.map((user, index) => {
          const rank = user.rank ?? index + 1;
          const isCurrentUser = user.id === currentUserId;
          const medal = medalColors[rank as keyof typeof medalColors];

          return (
            <div
              key={user.id}
              className={`flex items-center gap-4 p-4 transition-colors ${
                isCurrentUser
                  ? 'border-2 border-deep-forest bg-sapling-green/10'
                  : 'hover:bg-bone/50'
              }`}
            >
              {/* Rank */}
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm"
                style={medal ? { backgroundColor: medal.bg, color: medal.text } : undefined}
              >
                {medal ? medal.icon : rank}
              </div>

              {/* Avatar */}
              <Avatar
                src={user.photoUrl}
                alt={user.name}
                className="h-10 w-10"
              />

              {/* Name & Points */}
              <div className="flex-1">
                <p className={`font-medium ${isCurrentUser ? 'text-deep-forest' : 'text-charcoal'}`}>
                  {user.name}
                  {isCurrentUser && (
                    <span className="ml-2 text-xs text-muted">(Anda)</span>
                  )}
                </p>
                <p className="text-sm text-muted">
                  {user.total_points.toLocaleString()} poin
                </p>
              </div>

              {/* Points Badge */}
              <div className="flex items-center gap-1 rounded-full bg-sapling-green/20 px-3 py-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4 text-veridian-leaf"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-sm font-semibold text-veridian-leaf">
                  {user.total_points.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
