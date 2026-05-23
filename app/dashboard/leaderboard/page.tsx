import { Suspense } from 'react';
import { getLeaderboard } from '@/app/actions/rewards';
import { LeaderboardTable } from '@/components/pages/rewards/LeaderboardTable';
import { Card } from '@/components/ui/Card';
import type { User } from '@/types/index';

export default async function LeaderboardPage() {
  const result = await getLeaderboard(10);
  const users: (User & { rank?: number })[] = result.success ? result.data || [] : [];

  // Add ranks
  const rankedUsers = users.map((user, index) => ({
    ...user,
    rank: index + 1,
  }));

  // Mock current user ID
  const currentUserId = 'user-3';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Papan Peringkat</h1>
        <p className="mt-1 text-muted">
          Lihat siapa yang paling aktif melaporkan sampah
        </p>
      </div>

      {/* Top 3 highlight */}
      {rankedUsers.length >= 3 && (
        <div className="grid grid-cols-3 gap-4">
          {[1, 0, 2].map((pos) => {
            const user = rankedUsers[pos];
            const medal = ['🥇', '🥈', '🥉'][pos];
            return (
              <Card
                key={user.id}
                variant="bone"
                className={`p-4 text-center ${
                  pos === 0 ? 'order-2 border-2 border-[#D4AF37]' : ''
                }`}
              >
                <div className="text-3xl">{medal}</div>
                <p className="mt-2 font-semibold text-charcoal">{user.name}</p>
                <p className="text-sm text-muted">
                  {user.total_points.toLocaleString()} poin
                </p>
              </Card>
            );
          })}
        </div>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <LeaderboardTable users={rankedUsers} currentUserId={currentUserId} />
      </Suspense>
    </div>
  );
}
